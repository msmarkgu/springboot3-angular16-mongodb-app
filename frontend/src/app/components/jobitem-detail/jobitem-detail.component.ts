import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-jobitem-detail',
  templateUrl: './jobitem-detail.component.html',
  styleUrls: ['./jobitem-detail.component.css'],
})
export class JobItemDetailComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetJobItem(this.getId).subscribe((res: { [x: string]: any; }) => {
      this.updateForm.setValue({
        jobTitle: res['jobTitle'],
        company: res['company'],
        location: res['location'],
        applyLink: res['applyLink'],
        dateApplied: res['dateApplied'],
        jobStatus: res['jobStatus']
      });
    });

    this.updateForm = this.formBuilder.group({
      jobTitle: [''],
      company: [''],
      location: [''],
      applyLink: [''],
      dateApplied: [''],
      jobStatus: ['']
    });
  }

  ngOnInit() {}

  onUpdate(): any {
    this.crudService.updateJobItem(this.getId, this.updateForm.value).subscribe(
      () => {
        console.log('Data updated successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('/jobitems-list'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
