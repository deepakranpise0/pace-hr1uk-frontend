import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public httpOptions = {
    headers: new HttpHeaders({
      Token: `Bearer `,
    }),
  };

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
    return this.http
      .get<T>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  post<T, U>(endpoint: string, data: U): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;

    return this.http
      .post<T>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
}
