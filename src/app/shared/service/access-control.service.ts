import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Role} from "../enums/role.enum";
import {Observable} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {JwtHelperService} from '@auth0/angular-jwt';


const jwtHelperService = new JwtHelperService();

@Injectable()
export class AccessControlService {

  constructor(private http: HttpClient,
              private dialog: MatDialog) {
  }

signUpStudent(student: any): Observable<any> {
  return this.http.post<any>('api/v1/access-control/sign-up', JSON.stringify(student),
    {headers: new HttpHeaders().set('Content-Type', 'application/json')});
}

  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>('/api/v1/access-control/sign-in', JSON.stringify(credentials),
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  resetPassword(username: string): Observable<null> {
    return this.http.post<null>(`/api/access-control/reset-password?username=${username}`, null,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  changePassword(passwordChangeObj: any): Observable<null> {
    return this.http.post<null>(`/api/v1/access-control/change-password`,
      JSON.stringify(passwordChangeObj),
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  getSessionContexts(): Observable<any> {
    return this.http.get<any>('/api/v1/access-control/session-context');
  }

  setSession(auth: any) {
    localStorage.setItem('id_token', auth.token);
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('jobId');
    localStorage.removeItem('et_session');
  }

  isLoggedIn() {
    return localStorage.getItem('id_token') !== null;
  }

  // isStudent(): boolean {
  //   console.log('Session Context Check :', this.getSessionContext);
  //   return this.getSessionContext && this.getSessionContext.role === Role.STUDENT;
  // }
  //
  // isAdmin(): boolean {
  //   return this.getSessionContext && this.getSessionContext.role === Role.ADMIN;
  // }

  getLoggedInUserInfo(): any {
  const token = localStorage.getItem('id_token');
  if (token !== null) {
    return jwtHelperService.decodeToken(token);
  }
  return null;
}

   setSessionContext(sessionContext: any) {
    localStorage.setItem('et_session', JSON.stringify(sessionContext));
  }

   getSessionContext(): any {
    const session = localStorage.getItem('et_session');
    return session ? JSON.parse(session) : null;
  }

  private hasRole(role: Role): boolean {
    const token = localStorage.getItem('id_token');
    if (token !== null) {
      const decodedToken = jwtHelperService.decodeToken(token);
      return decodedToken.roles.includes(role);
    }
    return false;
  }

  resetLinkExpired(token: any): Observable<any> {
    return this.http.get<any>(`/api/v1/access-control/password-reset-link-expired?token=${token}`);
  }

  verifyEmail(token: string): Observable<null> {
    return this.http.post<null>(`/api/v1/access-control/verify-email?token=${token}`, null,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  resendEmailVerification(email: string): Observable<null> {
    return this.http.post<null>(`/api/v1/access-control/resend-email-verification?email=${email}`, null,
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  emailTokenExpiry(token: string): Observable<any> {
    return this.http.get<any>(`/api/v1/access-control/email-verification-token-expiry?token=${token}`);
  }
}
