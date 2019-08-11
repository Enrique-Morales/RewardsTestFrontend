import { Component, OnInit } from '@angular/core';
import {ServerAPIService} from 'src/app/services/server-api.service';
import { Router } from '@angular/router';
import {SessionService} from 'src/app/services/session.service';
import { TargetLocator } from 'selenium-webdriver';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {

  constructor(
    private serverAPI: ServerAPIService,
    private router: Router,
    private sessionService: SessionService
    ) { }

    title;
    target={
      id: null,
      firstName:"",
      lastName:""
    };
    usersList;
    selectedUsersList=[];
    filteredUsersList;

  ngOnInit() {
    this.serverAPI.getPageRequest("user", "getpage", 100, 1).subscribe(
      data => {
        console.log(data.message);
          this.usersList = data.message;
          this.filteredUsersList=this.usersList.slice();
      },
      error => {
    });
  }

  addUser(user){
    this.selectedUsersList.push(user);
    var index = this.filteredUsersList.indexOf(user);
    if (index > -1) {
      this.filteredUsersList.splice(index, 1);
    }
  }

  removeUser(user){
    this.filteredUsersList.push(user);
    var index = this.selectedUsersList.indexOf(user);
    if (index > -1) {
      this.selectedUsersList.splice(index, 1);
    }
  }
  checkData(){
    return this.selectedUsersList.length === 0 || !this.target.firstName || !this.title;
  }

  createReview(){

    let reviewlist = {
      id:null,
      title: this.title,
      author_id: this.sessionService.getUser().id,
      employee_id: this.target.id
    }

    this.serverAPI.updateRequest("reviewlist", "create", reviewlist).subscribe(
      data => {
        let veviewListId = data['message'].id;
          for (let i=0; i<this.selectedUsersList.length; i++){
            let review = {
              id: null,
              rating: null,
              comment: null,
              submitted: null,
              user_id: this.selectedUsersList[i].id,
              reviewlist_id: veviewListId
            }
            this.serverAPI.updateRequest("review", "create", review).subscribe(
              data => {
              },
              error => {
            });
          }
      },
      error => {
    });
  }

}
