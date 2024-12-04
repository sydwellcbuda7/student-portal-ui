import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPortalToastComponent } from './student-portal-toast.component';

describe('StudentPortalToastComponent', () => {
  let component: StudentPortalToastComponent;
  let fixture: ComponentFixture<StudentPortalToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentPortalToastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPortalToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
