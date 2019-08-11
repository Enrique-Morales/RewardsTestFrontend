import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {SessionService} from 'src/app/services/session.service';
import {ServerAPIService} from 'src/app/services/server-api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  nonSubmittedReviews;
  logedUser: UserInterface;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router,
    private serverAPI: ServerAPIService
  ) { }

  ngOnInit(){
    this.logedUser=this.sessionService.getUser();
    if(!this.logedUser){
      console.log("no user");
      this.router.navigate(['/login']);
    } else if (this.logedUser.usertype_id===2){
      this.serverAPI.getRequest("review", "getnonsubmitted", this.logedUser.id).subscribe(
        data => {
            this.nonSubmittedReviews = data.message;
            console.log(this.nonSubmittedReviews);
        },
        error => {
      });
    }
  }

  submitReview(reviewId){
    this.router.navigate(['/submitreview', reviewId]);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/