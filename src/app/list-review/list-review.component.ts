import { Component, OnInit } from '@angular/core';
import {ServerAPIService} from 'src/app/services/server-api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-review',
  templateUrl: './list-review.component.html',
  styleUrls: ['./list-review.component.css']
})
export class ListReviewComponent implements OnInit {

  constructor(
    private serverAPI: ServerAPIService,
    private router: Router,
    private route: ActivatedRoute
    ) { }
    employeeId;
    reviews;

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id');
    });
    this.serverAPI.getRequest("review", "getpagebyuser", this.employeeId).subscribe(
      data => {
        console.log(data.message);
        this.reviews = data.message;
      },
      error => {
    });
  }

}
