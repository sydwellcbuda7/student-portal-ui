import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AccessControlService} from "../../shared/service/access-control.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StudentService} from "../../shared/service/student.service";

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
              private studentService: StudentService,
              private fb: FormBuilder) {


    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      studentNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  if (this.registerForm) {
    this.registerForm.valueChanges.subscribe((value) => {
      console.log('value changed', value);
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;

      if (password && confirmPassword && password !== confirmPassword) {
        this.registerForm.get('confirmPassword')?.setErrors({ confirmPassword: true });
      } else {
        const errors = this.registerForm.get('confirmPassword')?.errors;
        if (errors) {
          delete errors['confirmPassword'];
          if (Object.keys(errors).length === 0) {
            this.registerForm.get('confirmPassword')?.setErrors(null);
          }
        }
      }
    });
  }
}

  toggleRegisterMode(event: Event): void {
    event.preventDefault(); // Prevents the default anchor behavior
    this.isRegisterMode = !this.isRegisterMode;
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
        this.logUserIn(credentials);
      } else {
        this.markAllFieldsAsTouched(this.loginForm);
      }


  }

  logUserIn(credentials: any): void{
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
  }

  register(): void {
    if (this.registerForm.valid) {

      const firstName = this.registerForm.get('firstName')?.value as string;
      const lastName = this.registerForm.get('lastName')?.value as string;
      const gender = this.registerForm.get('gender')?.value as string;
      // const studentNumber = this.registerForm.get('studentNumber')?.value as string;
      const email = this.registerForm.get('email')?.value as string;
      const password = this.registerForm.get('password')?.value as string;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value as string;
      if (password !== confirmPassword) {
        this.registerForm.get('password')?.setErrors({ confirmPassword: true });
        return
      } else {
        // Clear the error if the passwords match
        const errors = this.registerForm.get('password')?.errors;
        if (errors) {
          delete errors['confirmPassword'];
          if (Object.keys(errors).length === 0) {
            this.registerForm.get('password')?.setErrors(null);
          }
        }
      }

      const student = {
        firstName,
        lastName,
        gender,
        // studentNumber,
        email,
        password
      };
        console.log('student', student);
      this.studentService.registerOrUpdateStudent(student).subscribe((data) => {
        const credentials = {
          username: email,
          password: password
        };
       this.logUserIn(credentials)
      }, (error) => {

      });
    } else {
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
