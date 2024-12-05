import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Role} from "../enums/role.enum";
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';


const jwtHelperService = new JwtHelperService();

@Injectable()
export class AccessControlService {

  constructor(private http: HttpClient) {
  }



  loginUser(credentials: any): Observable<any> {
    return this.http.post<any>('/api/v1/access-control/sign-in', JSON.stringify(credentials),
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  resetPassword(email: string): Observable<null> {
    return this.http.post<null>(`/api/v1/access-control/reset-password?email=${email}`, null,
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
    localStorage.removeItem('sp_session');
  }

  getLoggedInUserInfo(): any {
  const token = localStorage.getItem('id_token');
  if (token !== null) {
    return jwtHelperService.decodeToken(token);
  }
  return null;
}

   setSessionContext(sessionContext: any) {
    localStorage.setItem('sp_session', JSON.stringify(sessionContext));
  }

   getSessionContext(): any {
    const session = localStorage.getItem('sp_session');
    return session ? JSON.parse(session) : null;
  }



}
