import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ServerAPIService} from 'src/app/services/server-api.service';
import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import * as sha256 from 'js-sha256';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeeId;
  employee: {
      id: null;
      firstName: null;
      lastName: null;
      email: null;
      phone: null;
      password: string;
      usertype_id: 2;
  };
  typeuserList: [{
    id: null;
    desc: null;
}];
  userEditForm;
  editing=false;
  create=false;
  passwordInput;
  success;
  removed;

  constructor(
    private route: ActivatedRoute,
    private serverAPI: ServerAPIService,
    private datePicker: MatDatepickerModule,
    private matNativeDateModule: MatNativeDateModule,
    private formBuilder: FormBuilder,
    private router: Router
    ) {
      this.employee= {
          id: null,
          firstName: null,
          lastName: null,
          email: null,
          phone: null,
          password: null,
          usertype_id: 2,
      };
      this.typeuserList=[{
        id: null,
        desc: null,
      }];
      this.userEditForm = this.formBuilder.group({
        id: new FormControl(),
        firstName: new FormControl(),
        lastName: new FormControl(),
        email: new FormControl(),
        phone: new FormControl(),
        userTypeText: new FormControl(),
        userTypeSelect: new FormControl(),
      });
    }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id');
    });
    this.serverAPI.getPageRequest("usertype", "getpage", 5,1).subscribe(
      data => {
          this.typeuserList = data.message;
      },
      error => {
    });
    if (this.employeeId!=="create"){
      this.serverAPI.getRequest("user", "get", this.employeeId).subscribe(
        data => {
            this.employee = data.message;
            
            this.userEditForm = this.formBuilder.group({
              id: data.message.id,
              firstName: data.message.firstName,
              lastName: data.message.lastName,
              email: data.message.email,
              phone: data.message.phone,
              userTypeText: data.message.typeuser_obj.desc,
              userTypeSelect: [data.message.typeuser_obj]
            });
        },
        error => {
      });

    } else {
      this.create=true;
    }
  }

  updateUser(){
    console.log(this.userEditForm.value);
    this.employee={
      id: this.userEditForm.value.id,
      firstName: this.userEditForm.value.firstName,
      lastName: this.userEditForm.value.lastName,
      email: this.userEditForm.value.email,
      phone: this.userEditForm.value.phone,
      password: null,
      usertype_id: this.userEditForm.value.userTypeSelect.id,
    }
    console.log(this.employee);
    this.serverAPI.updateRequest("user", "update", this.employee).subscribe(
      data => {
            console.log(data);
      },
      error => {
    });
  }

  createUser(){
    this.employee.password=sha256.sha256(this.passwordInput);
    this.serverAPI.updateRequest("user", "create", this.employee).subscribe(
      data => {
            console.log(data);
            this.create=false;
            this.success=true;
      },
      error => {
    });
  
  }

  deleteUser(){
    this.serverAPI.getRequest("user", "remove", this.employeeId).subscribe(
      data => {
        this.removed=true;
      },
      error => {
    });
  }

  cancel(){
    this.router.navigate(['employees']);
  }

}
