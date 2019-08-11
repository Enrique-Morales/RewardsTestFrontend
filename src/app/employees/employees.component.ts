import { Component, OnInit } from '@angular/core';
import {ServerAPIService} from 'src/app/services/server-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employeeList: UserInterface[];

  constructor(
    private serverAPI: ServerAPIService,
    private router: Router) { }

  ngOnInit() {
    this.serverAPI.getPageRequest("user", "getpage", 100, 1).subscribe(
      data => {
          this.employeeList = data.message;
      },
      error => {
    });

  }

  seeEmployee(id){
    this.router.navigate(['employee/'+id]);
  }

  createEmployee(){
    this.router.navigate(['employee/create']);
  }

}
