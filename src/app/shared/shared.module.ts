import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../material/material.module";
import {StudentPortalToastComponent} from "./student-portal-toast/student-portal-toast.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ContentWrapperComponent} from "./content-wrapper/content-wrapper.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import {AccessControlService} from "./service/access-control.service";



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
    HttpClientModule,
  ],
  exports: [
    StudentPortalToastComponent,
    RouterModule,
  ],

  providers: [
    AccessControlService]
})
export class SharedModule { }
