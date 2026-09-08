import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincontactsComponent } from './admincontacts.component';

describe('AdmincontactsComponent', () => {
  let component: AdmincontactsComponent;
  let fixture: ComponentFixture<AdmincontactsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmincontactsComponent]
    });
    fixture = TestBed.createComponent(AdmincontactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
