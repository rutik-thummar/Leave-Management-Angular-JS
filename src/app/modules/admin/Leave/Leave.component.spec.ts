import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveComponent } from './Leave.component';

describe('LeaveComponent', () => {
  let component: LeaveComponent;
  let fixture: ComponentFixture<LeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
