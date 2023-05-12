import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-jobitem',
  templateUrl: './add-jobitem.component.html',
  styleUrls: ['./add-jobitem.component.css'],
})
export class AddJobItemComponent implements OnInit {
  jobItemForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.jobItemForm = this.formBuilder.group({
      jobTitle: [''],
      company: [''],
      location: [''],
      applyLink: [''],
      dateApplied: [''],
      jobStatus: ['']
    });
  }

  ngOnInit() {}

  onSubmit(): any {
    this.crudService.AddJobItem(this.jobItemForm.value).subscribe(
      () => {
        console.log('Data added successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('/jobitems-list'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
