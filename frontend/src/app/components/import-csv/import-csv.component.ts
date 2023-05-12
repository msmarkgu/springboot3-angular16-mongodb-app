import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FileUploadService } from '../../service/file-upload.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.css'],
})
export class ImportCSVComponent implements OnInit {

  // Variable to store shortLink from api response
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file?: File | null = null; // Variable to store file

  // Inject service
  constructor(
    private router: Router,
    private fileUploadService: FileUploadService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
  }

  // On file Select
  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    if (this.file) {
      this.fileUploadService.uploadCsv(this.file).subscribe(
          (event: any) => {
              if (typeof (event) === 'object') {

                  // Short link via api response
                  this.shortLink = event.link;

                  this.loading = false; // Flag variable
              }

              this.ngZone.run(() => this.router.navigateByUrl('/jobitems-list'));
          }
      );
    }
  }
}