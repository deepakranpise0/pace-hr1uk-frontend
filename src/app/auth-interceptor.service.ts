import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  catchError,
  Observable,
  throwError,
} from 'rxjs';

import { ApiService } from './services/api/api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router:Router,private _apiService: ApiService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken=this._apiService.getAccessToken()
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
        return throwError(error);
      })
    );;
  }
}
