import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) {
  }


  registerOrUpdateStudent(student: any): Observable<any> {
    return this.http.post<any>('api/v1/student', JSON.stringify(student),
      {headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  getStudentById(id: number): Observable<any> {
    return this.http.get<any>(`api/v1/student/${id}`);
  }

}
