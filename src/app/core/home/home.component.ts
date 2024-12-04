import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccessControlService} from "../../shared/service/access-control.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isLoginMode = true; // Toggle between login and register modes

  username = '';
  email = '';
  password = '';
  confirmPassword = '';

  errorMessage = '';
  hide = true;
  isRegisterMode = false;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private router: Router,
              private accessControlService: AccessControlService,
              private fb: FormBuilder) {


    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      studentNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  toggleRegisterMode(event: Event): void {
    event.preventDefault(); // Prevents the default anchor behavior
    this.isRegisterMode = !this.isRegisterMode;
  }


  toggleMode() {
    this.isLoginMode = !this.isLoginMode; // Switch between login and register
    this.clearFields();
  }

  clearFields() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
    this.errorMessage = '';
  }


  login(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value as string;
      const password = this.loginForm.get('password')?.value as string;
      const credentials = {
        username,
        password
      };

      this.accessControlService.loginUser(credentials).subscribe((data) => {
        this.accessControlService.setSession(data);

        this.accessControlService.getSessionContexts().subscribe((sessionContextList) => {
          if (sessionContextList.length > 1) {
            this.accessControlService.setSessionContext(
              sessionContextList.find((s: { role: string }) => s.role === 'STUDENT')
            );
          } else {
            this.accessControlService.setSessionContext(sessionContextList[0]);
          }

          this.router.navigate(['/student']);

        });
      }, (error) => {

      });
    } else {
      this.markAllFieldsAsTouched(this.loginForm);
    }
  }

  register(): void {
    console.log('Register ');

    if (this.registerForm.valid) {
      const userDetails = this.registerForm.value;
      console.log('Register:', userDetails);

    } else {
      console.log('Register failed');
      this.markAllFieldsAsTouched(this.registerForm);
    }
  }

  private markAllFieldsAsTouched(form: FormGroup): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control?.markAsTouched({onlySelf: true});
    });
  }

}
