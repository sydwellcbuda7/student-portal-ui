import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AccessControlService} from "../../shared/service/access-control.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  resetPasswordForm: FormGroup;

  constructor(private router: Router,
              private accessControlService: AccessControlService,
              private fb: FormBuilder) {

    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

  }


  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      const email = this.resetPasswordForm.get('email')?.value as string;
      this.accessControlService.resetPassword(email).subscribe(() => {
        this.router.navigate(['/']);
      });

    } else {
      this.markAllFieldsAsTouched(this.resetPasswordForm);
    }
  }

  private markAllFieldsAsTouched(form: FormGroup): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control?.markAsTouched({onlySelf: true});
    });
  }


  navigateHome() {
    this.router.navigate([''])
  }
}
