import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // Import BrowserModule
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {StudentPortalToastComponent} from "./shared/student-portal-toast/student-portal-toast.component";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {StudentModule} from "./student/student.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    StudentModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      toastComponent: StudentPortalToastComponent,
    }),
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
