import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  readonly AUTHORIZATION_HEADER = 'Authorization';

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('id_token');
    console.log('token :', token);
    if (token) {
      const clonedRequest = request.clone(
        {
          headers: request.headers.set(this.AUTHORIZATION_HEADER, `${token}`)
        });
      return next.handle(clonedRequest);
    } else {
      return next.handle(request);
    }
  }
}
