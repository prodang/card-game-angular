import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthMngService} from "./managers/auth-mng.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthMngService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authToken: any;
    authToken = this.auth.getToken();
    const authReq = request.clone({headers: request.headers.set('Authorization', 'Bearer '+authToken)});
    return next.handle(authReq);
  }
}
