import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  // API url
  REST_API: string = 'http://localhost:8080/api/v1/jobItems/import';

  constructor(private http: HttpClient) { }

  // Returns an observable
  uploadCsv(file: File): Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(this.REST_API, formData)
  }
}
