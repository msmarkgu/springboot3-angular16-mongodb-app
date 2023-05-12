import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobItemsListComponent } from './jobitems-list.component';

describe('JobItemsListComponent', () => {
  let component: JobItemsListComponent;
  let fixture: ComponentFixture<JobItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobItemsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
