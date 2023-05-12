import { Injectable } from '@angular/core';
import { JobItem } from './JobItem';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  // Node/Express API
  REST_API: string = 'http://localhost:8080/api/v1';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  // Add
  AddJobItem(data: JobItem): Observable<any> {
    let API_URL = `${this.REST_API}/jobItems`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  // Get all objects
  GetJobItems(params: any): Observable<any> {
    return this.httpClient.get<any>(`${this.REST_API}/jobItems`, { params });
  }

  // Get single object
  GetJobItem(id: any): Observable<JobItem> {
    let API_URL = `${this.REST_API}/jobItems/${id}`;
    return this.httpClient.get<JobItem>(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Update
  updateJobItem(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/jobItems/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Delete
  deleteJobItem(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/jobItems/${id}`;
    return this.httpClient
      .delete(API_URL, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
