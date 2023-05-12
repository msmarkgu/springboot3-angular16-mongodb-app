import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobItemComponent } from './add-jobitem.component';

describe('AddJobItemComponent', () => {
  let component: AddJobItemComponent;
  let fixture: ComponentFixture<AddJobItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJobItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJobItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
