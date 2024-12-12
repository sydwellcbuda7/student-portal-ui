import {NgModule, Optional, SkipSelf} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {routes} from "./routes";
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthorizedUserGuard} from "../security/activate-if-user-authorized.guard";
import {addAuthorizationGuards} from "../security/add-authorization-guards";
import {HomeComponent} from "./home/home.component";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [
    HomeComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthorizedUserGuard,
  ],

})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, router: Router) {
    if (parentModule) {
      throw new Error('CoreModule already loaded!');
    }
    router.resetConfig(addAuthorizationGuards(routes));
  }

}
