import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  public isUserLoggedIn = new BehaviorSubject<boolean>(false);
  accessToken = 'access_token';
  userRole = 'role';
  constructor(private http: HttpClient, private route: Router) {}

  public httpOptions = {
    headers: new HttpHeaders({
      Token: `Bearer `,
    }),
  };

  get isLoggedIn() {
    return this.isUserLoggedIn.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something went wrong; please try again later.');
  }

  get<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }

  post<T, U>(endpoint: string, data: U, _id: string = ''): Observable<T> {
    let url = `${this.baseUrl}/${endpoint}`;
    console.log(_id);
    if (_id != '') {
      url += `/${_id}`;
      return this.http.put<T>(url, data).pipe(catchError(this.handleError));
    }

    return this.http.post<T>(url, data).pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete<T>(url).pipe(catchError(this.handleError));
  }

  logout(): void {
    localStorage.removeItem(this.accessToken);
    this.isUserLoggedIn.next(false);
    this.route.navigate(['login']);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessToken);
  }

  getUserRole(): string | null {
    return localStorage.getItem(this.userRole);
  }

  setLocalStorage(token: string, role: string): void {
    localStorage.setItem(this.accessToken, token);
    localStorage.setItem(this.userRole, role);
  }
}
