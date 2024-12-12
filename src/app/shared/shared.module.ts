import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {StudentPortalToastComponent} from "./student-portal-toast/student-portal-toast.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ContentWrapperComponent} from "./content-wrapper/content-wrapper.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import {AccessControlService} from "./service/access-control.service";
import {StudentService} from "./service/student.service";



@NgModule({
  declarations: [
    StudentPortalToastComponent,
    ContentWrapperComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    StudentPortalToastComponent,
    RouterModule,
  ],

  providers: [
    AccessControlService,
    StudentService
  ]
})
export class SharedModule { }
