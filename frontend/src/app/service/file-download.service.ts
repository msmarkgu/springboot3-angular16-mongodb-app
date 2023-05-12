import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})

export class FileDownloadService {

  // API url
  REST_API: string = 'http://localhost:8080/api/v1/jobItems/export';

  constructor(private http: HttpClient) { }

  // Returns an observable
  downloadCsv(): void {
    const headers = new HttpHeaders().set('Accept', 'text/csv');
    const options = { headers, responseType: 'text' as const };

    this.http.get(this.REST_API, options).subscribe(
      (data) => {
        const blob = new Blob([data], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'job-application-records.csv');
      },
      (error) => {
        console.error('Error downloading CSV: ', error);
      }
    );
  }
}
