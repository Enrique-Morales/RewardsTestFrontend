import { Component, OnInit } from '@angular/core';
import {SessionService} from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  constructor(
    private sessionService: SessionService,
    private router: Router) { }

  ngOnInit() {

  }

  logout(){
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/