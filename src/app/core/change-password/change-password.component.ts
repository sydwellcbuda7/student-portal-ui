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
    this.route.queryParamMap.subscribe((params) => {
      this.token = params.get('token');
    });

    if (this.changePasswordForm) {
      this.changePasswordForm.valueChanges.subscribe((value) => {
        console.log('value changed', value);
        const password =this.changePasswordForm.get('password')?.value;
        const confirmPassword =this.changePasswordForm.get('confirmPassword')?.value;

        if (password && confirmPassword && password !== confirmPassword) {
          this.changePasswordForm.get('confirmPassword')?.setErrors({ confirmPassword: true });
        } else {
          const errors =this.changePasswordForm.get('confirmPassword')?.errors;
          if (errors) {
            delete errors['confirmPassword'];
            if (Object.keys(errors).length === 0) {
              this.changePasswordForm.get('confirmPassword')?.setErrors(null);
            }
          }
        }
      });
    }
  }

  changePassword(): void {
    if (this.changePasswordForm.valid) {
      const password = this.changePasswordForm.get('password')?.value as string;
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
