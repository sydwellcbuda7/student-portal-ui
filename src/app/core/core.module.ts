import {NgModule, Optional, SkipSelf} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {routes} from "./routes";
import {SharedModule} from "../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "../material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthorizedUserGuard} from "../security/activate-if-user-authorized.guard";
import {addAuthorizationGuards} from "../security/add-authorization-guards";
import {HomeComponent} from "./home/home.component";
import {MatInputModule} from "@angular/material/input";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    HomeComponent,
    ResetPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
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
