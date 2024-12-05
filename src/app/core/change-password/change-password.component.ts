import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccessControlService} from "../../shared/service/access-control.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  token: string | null = null;
  hide = true;

  changePasswordForm: FormGroup;

  constructor(private router: Router,
              private accessControlService: AccessControlService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {

    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });

  }

  ngOnInit(): void {
    // Get the 'token' query parameter from the URL
    this.route.queryParamMap.subscribe((params) => {
      this.token = params.get('token');
      console.log('Token:', this.token); // Optional: Log the token
    });
  }

  changePassword(): void {
    if (this.changePasswordForm.valid) {
      const password = this.changePasswordForm.get('password')?.value as string;
      const confirmPassword = this.changePasswordForm.get('confirmPassword')?.value as string;

      const changePasswordTo = {
        token: this.token,
        password
      };
      this.accessControlService.changePassword(changePasswordTo).subscribe(() => {
        this.navigateHome()
      });

    } else {
      this.markAllFieldsAsTouched(this.changePasswordForm);
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
