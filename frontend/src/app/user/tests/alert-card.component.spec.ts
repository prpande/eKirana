import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertCardComponent } from '../components/alert-card/alert-card.component';

describe('AlertCardComponent', () => {
  let component: AlertCardComponent;
  let fixture: ComponentFixture<AlertCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertCardComponent]
    });
    fixture = TestBed.createComponent(AlertCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
