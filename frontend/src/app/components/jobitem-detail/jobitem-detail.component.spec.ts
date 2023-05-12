import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobItemDetailComponent } from './jobitem-detail.component';

describe('JobItemDetailComponent', () => {
  let component: JobItemDetailComponent;
  let fixture: ComponentFixture<JobItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobItemDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
