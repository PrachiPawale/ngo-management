import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDonationsComponent } from './admin-donations.component';

describe('AdminDonationsComponent', () => {
  let component: AdminDonationsComponent;
  let fixture: ComponentFixture<AdminDonationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDonationsComponent]
    });
    fixture = TestBed.createComponent(AdminDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
