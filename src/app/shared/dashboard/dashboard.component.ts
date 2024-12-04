import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AccessControlService} from "../service/access-control.service";
import {MatMenuTrigger} from "@angular/material/menu";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  searchQuery: string = '';
  inputValue: string = '';
  students = [
    {id: 1, name: 'John Doe', age: 20, course: 'Computer Science'},
    {id: 2, name: 'Jane Smith', age: 22, course: 'Mathematics'},
    {id: 3, name: 'Emily Johnson', age: 21, course: 'Physics'},
  ];

  user = {
    name: 'Sydwell',
    surname: 'Ngwenya',
    email: 'Sydwellcbu7@gmail.com',
    studentNumber: '217563810',
    gender: 'Male',
  };

  isEditingProfile = false;


  constructor(private router: Router,
              private accessControlService: AccessControlService,
              private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
  }


  logout() {
    this.accessControlService.logout();
    this.router.navigate(['/']);
  }

  editPassword() {
    this.snackBar.open('A password reset link has been sent to your email.', 'Close', {
      duration: 3000,
    });
  }

  // Toggle profile edit mode
  toggleEditProfile() {
    this.isEditingProfile = !this.isEditingProfile;
  }

  // Submit profile edits (just log for now)
  onSubmitProfile() {
    console.log('Profile saved:', this.user);
    this.isEditingProfile = false; // Toggle off edit mode
  }
}
