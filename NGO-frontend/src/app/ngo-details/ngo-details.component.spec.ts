import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgoDetailsComponent } from './ngo-details.component';

describe('NgoDetailsComponent', () => {
  let component: NgoDetailsComponent;
  let fixture: ComponentFixture<NgoDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgoDetailsComponent]
    });
    fixture = TestBed.createComponent(NgoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
