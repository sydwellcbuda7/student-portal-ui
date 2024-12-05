import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AccessControlService} from "../service/access-control.service";
import {MatMenuTrigger} from "@angular/material/menu";
import {MatSnackBar} from "@angular/material/snack-bar";
import {StudentService} from "../service/student.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  profileForm: FormGroup;
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  student: any;
  isEditMode: boolean = false;


  constructor(private router: Router,
              private accessControlService: AccessControlService,
              private studentService: StudentService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) {

    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      studentNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    });

  }

  ngOnInit(): void {
    this.loadStudentById(this.accessControlService.getSessionContext().userId); // Replace with actual student ID
  }


  logout() {
    this.accessControlService.logout();
    this.router.navigate(['/']);
  }

  loadStudentById(studentId: number): void {
    if (studentId) {
      this.studentService.getStudentById(studentId).subscribe((student) => {
        this.student = student
        this.profileForm.get('firstName')?.setValue(student.firstName);
        this.profileForm.get('lastName')?.setValue(student.lastName);
        this.profileForm.get('gender')?.setValue(student.gender);
        this.profileForm.get('studentNumber')?.setValue(student.studentNumber);
        this.profileForm.get('email')?.setValue(student.email);
        this.profileForm.get('password')?.setValue(student.password);
      }, err => {
        console.error('Error retrieving student:', err);
      });
      this.profileForm.disable()
    }

  }


  toggleEditMode() {
    this.isEditMode = !this.isEditMode;

    if (this.isEditMode) {
      this.profileForm.enable();
    } else {

      if (this.profileForm.valid) {

        const firstName = this.profileForm.get('firstName')?.value as string;
        const lastName = this.profileForm.get('lastName')?.value as string;
        const gender = this.profileForm.get('gender')?.value as string;
        const studentNumber = this.profileForm.get('studentNumber')?.value as string;
        const email = this.profileForm.get('email')?.value as string;
        const password = this.profileForm.get('password')?.value as string;
        const confirmPassword = this.profileForm.get('confirmPassword')?.value as string;
        this.student.firstName = firstName
        this.student.lastName = lastName
        this.student.gender = gender
        this.student.studentNumber = studentNumber
        this.student.email = email
        this.student.firstName = firstName

        console.log('student', this.student);
        this.studentService.registerOrUpdateStudent(this.student).subscribe((data) => {
          this.student = data
          this.profileForm.disable();

        }, (error) => {

        });

      } else {
        this.markAllFieldsAsTouched(this.profileForm);
      }
    }
  }

  private markAllFieldsAsTouched(form: FormGroup): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control?.markAsTouched({onlySelf: true});
    });
  }

  changePassword() {
    this.accessControlService.resetPassword(this.student.email).subscribe((data) => {

    })
  }
}
