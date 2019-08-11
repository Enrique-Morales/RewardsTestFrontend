import { Component, OnInit } from '@angular/core';
import * as sha256 from 'js-sha256';
import { HttpClient, HttpResponse } from '@angular/common/http';
import {Observable} from "rxjs";
import { Router } from '@angular/router';
import {SessionService} from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private router: Router) { }

    login;
    pass;
    logedUser: UserInterface;

  ngOnInit() {
  }
  
  doLogin(){
    this.sessionService
      .login(this.login, sha256.sha256(this.pass))
      .subscribe(
        data => {
          if(data.status===401){
            alert("Bad Authentication");
          } else {
            this.logedUser = data.message;
              this.sessionService.setUser(this.logedUser);
              console.log(this.sessionService.getUser());
              this.router.navigate(['']);
          }
        },
        error => {
  });
  }

}
