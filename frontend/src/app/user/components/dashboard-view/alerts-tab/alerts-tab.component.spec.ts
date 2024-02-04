import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsTabComponent } from './alerts-tab.component';

describe('AlertsTabComponent', () => {
  let component: AlertsTabComponent;
  let fixture: ComponentFixture<AlertsTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertsTabComponent]
    });
    fixture = TestBed.createComponent(AlertsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
