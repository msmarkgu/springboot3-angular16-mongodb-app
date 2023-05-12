import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FileDownloadService } from '../../service/file-download.service';

@Component({
  selector: 'app-export-csv',
  templateUrl: './export-csv.component.html',
  styleUrls: ['./export-csv.component.css'],
})
export class ExportCSVComponent implements OnInit {

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable

  // Inject service
  constructor(
    private router: Router,
    private fileDownloadService: FileDownloadService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
  }

  // OnClick of button Upload
  onDownload() {
    this.loading = !this.loading;

    this.fileDownloadService.downloadCsv();
  }

}