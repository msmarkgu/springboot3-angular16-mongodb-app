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
  REST_API_BASE: string = 'http://localhost:8080/api/v1';

  getDomainOfClientUrl(): string {
    let url = window.location.href;
    let domain = (new URL(url));
    return domain.hostname;
  }

  getTargetApi() {
    /* This is to allow the frontend to be called from another computer in your same home network. For example, you have 2 laptops at home. You start the frontend and backend from laptop A. In laptop A, you can access the frontend by enter url in Browser like:
    "http://localhost:4200". But in laptop B, you need to replace "localhost" by the internal IP address of A, e.g. 10.0.0.101, which is "http://10.0.0.101:4200".

    But this only takes you to the frontend of the App. If you clicked any button or link, you would get nothing because all the backend calls failed. This is because the backend URL is "localhost", which the browser thought is the laptop B.

    To get around this, the trick is to get the current url in the browser's address bar, parse out the domain (i.e., the internal IP in this case), and substitute localhost.
    */
    let domain = this.getDomainOfClientUrl();
    return this.REST_API_BASE.replace("localhost", domain);
  }

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {}

  // Add
  AddJobItem(data: JobItem): Observable<any> {
    //let API_URL = `${this.REST_API}/jobItems`;
    let API_URL = `${this.getTargetApi()}/jobItems`;
    return this.httpClient
      .post(API_URL, data)
      .pipe(catchError(this.handleError));
  }

  // Get all objects
  GetJobItems(params: any): Observable<any> {
    let API_URL = `${this.getTargetApi()}/jobItems`;
    return this.httpClient.get<any>(API_URL, { params });
  }

  // Get single object
  GetJobItem(id: any): Observable<JobItem> {
    let API_URL = `${this.getTargetApi()}/jobItems/${id}`;
    return this.httpClient.get<JobItem>(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  // Update
  updateJobItem(id: any, data: any): Observable<any> {
    let API_URL = `${this.getTargetApi()}/jobItems/${id}`;
    return this.httpClient
      .put(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Delete
  deleteJobItem(id: any): Observable<any> {
    let API_URL = `${this.getTargetApi()}/jobItems/${id}`;
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

  checkClientPublicIPAddress(): void {
    this.httpClient.get("http://api.ipify.org/?format=json").subscribe((resp:any) => {
      console.log("clientIP = " + resp.ip);
    });
  }
}
