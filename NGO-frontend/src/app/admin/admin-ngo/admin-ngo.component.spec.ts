import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNgoComponent } from './admin-ngo.component';

describe('AdminNgoComponent', () => {
  let component: AdminNgoComponent;
  let fixture: ComponentFixture<AdminNgoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminNgoComponent]
    });
    fixture = TestBed.createComponent(AdminNgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
