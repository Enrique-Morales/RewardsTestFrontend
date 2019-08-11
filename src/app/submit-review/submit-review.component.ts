import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {ServerAPIService} from 'src/app/services/server-api.service';

@Component({
  selector: 'app-submit-review',
  templateUrl: './submit-review.component.html',
  styleUrls: ['./submit-review.component.css']
})
export class SubmitReviewComponent implements OnInit {

review ={
  id:0,
  rating:0,
  comment:"",
  submitted:false,
};
ratingList = [1,2,3,4,5];
submitted=false;

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private serverAPI: ServerAPIService
  ) { }

  ngOnInit() {
    let reviewId;
    this.router.paramMap.subscribe(params => {
      reviewId = params.get('id');
    });
    this.serverAPI.getRequest("review", "get", reviewId).subscribe(
      data => {
          this.review = data.message;
          this.review.comment="";
          console.log(this.review);
      },
      error => {
    });

  }

  checkData(){
    return this.review.rating === 0;
  }

  submit(){
    console.log(this.review);
    this.review.submitted=true;
    this.serverAPI.updateRequest("review", "update", this.review).subscribe(
      data => {
            console.log(data);
            this.submitted=true;
      },
      error => {
    });
  }

}
