import { Component, OnInit } from '@angular/core';
import {ServerAPIService} from 'src/app/services/server-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-review',
  templateUrl: './admin-review.component.html',
  styleUrls: ['./admin-review.component.css']
})
export class AdminReviewComponent implements OnInit {

  constructor(
    private serverAPI: ServerAPIService,
    private router: Router
    ) { }
  noRating = "";
  submittedText="Yes";
  nonSubmittedText="No";
  reviews;
  selectedList={
    id:null,
  };
  usersList=[];
  filteredUsersList=[];

  selectedReview={
    title:"",
    subTitle: "",
    rating:"",
    content:""
  };


  ngOnInit() {
    this.fetchReviews();
    this.serverAPI.getPageRequest("user", "getpage", 100, 1).subscribe(
      data => {
        console.log(data.message);
          this.usersList = data.message;
      },
      error => {
    });
  }

  setSelectedReview(selected, employee, reviewTitle){
    this.selectedReview={
      title: selected.user_obj.firstName + " " + selected.user_obj.lastName + " review on " + employee.firstName + " " + employee.lastName,
      subTitle: reviewTitle,
      rating: selected.rating > 0 ? selected.rating : "No rating",
      content: selected.comment ? selected.comment : "No comment",
    };
  }

  filterUsers(selected){
    this.selectedList=selected;
    this.filteredUsersList=[];
    let usersAlreadyOnReview=[];
    console.log(selected)
    for (let i=0; i<selected.reviewList.length; i++){
      console.log(selected.reviewList[i])
      usersAlreadyOnReview.push(selected.reviewList[i].user_id);
    }
    console.log(usersAlreadyOnReview);
    for (let i=0; i<this.usersList.length; i++){
      if (!usersAlreadyOnReview.includes(this.usersList[i].id)){
        this.filteredUsersList.push(this.usersList[i]);
      }
    }
  }

  addUser(user){
    let review = {
      id: null,
      rating: null,
      comment: null,
      submitted: null,
      user_id: user.id,
      reviewlist_id: this.selectedList.id
    }
    this.serverAPI.updateRequest("review", "create", review).subscribe(
      data => {
        this.fetchReviews();
      },
      error => {
    });
  }

  fetchReviews(){
    this.serverAPI.getPageRequest("reviewlist", "getpage", 100, 1).subscribe(
      data => {
        console.log(data.message);
          this.reviews = data.message;
      },
      error => {
    });
  }

  removeUser(review){
    this.serverAPI.getRequest("review", "remove", review.id).subscribe(
      data => {
        console.log(data.message);
        this.fetchReviews();
      },
      error => {
    });
  }

}
