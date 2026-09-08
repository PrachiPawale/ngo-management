import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurWorkComponent } from './our-work.component';

describe('OurWorkComponent', () => {
  let component: OurWorkComponent;
  let fixture: ComponentFixture<OurWorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OurWorkComponent]
    });
    fixture = TestBed.createComponent(OurWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
