import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employee/employee.component';
import {MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,} from '@angular/material';
import { AdminReviewComponent } from './admin-review/admin-review.component';
import { CreateReviewComponent } from './create-review/create-review.component';
import { SubmitReviewComponent } from './submit-review/submit-review.component';
import { ListReviewComponent } from './list-review/list-review.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent },
      { path: 'login', component: LoginComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'adminreviews', component: AdminReviewComponent },
      { path: 'createreview', component: CreateReviewComponent },
      { path: 'employee/:id', component: EmployeeComponent },
      { path: 'submitreview/:id', component: SubmitReviewComponent },
      { path: 'myreviews/:id', component: ListReviewComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    LoginComponent,
    ProductListComponent,
    EmployeesComponent,
    EmployeeComponent,
    AdminReviewComponent,
    CreateReviewComponent,
    SubmitReviewComponent,
    ListReviewComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
    MatDatepickerModule,
    ReactiveFormsModule,
    HttpClientModule],
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/