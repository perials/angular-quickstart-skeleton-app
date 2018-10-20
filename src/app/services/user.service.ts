import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../classes/user';
import { ApiResponse } from '../classes/api-response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private userApiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<User[]> {
    return this.http.get<ApiResponse>(this.userApiUrl)
      .pipe(
        map(apiData => {
          // return apiData.data;
          return apiData.map(d => <User>d);
        }),
        catchError(this.handleError)
      );
  }
  
  add(user: User) {
    return this.http.post(this.userApiUrl, user, httpOptions)
      .pipe(
        map(apiData => {
          // return apiData.data;
          return apiData;
        }),
        catchError(this.handleError)
      );
  }
  
  edit(user: User) {
    return this.http.put(this.userApiUrl + '/' + user.id, user, httpOptions)
      .pipe(
        map(apiData => {
          // return apiData.data;
          return apiData;
        }),
        catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
