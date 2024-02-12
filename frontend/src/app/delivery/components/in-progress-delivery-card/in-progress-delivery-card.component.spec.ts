import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressDeliveryCardComponent } from './in-progress-delivery-card.component';

describe('InProgressDeliveryCardComponent', () => {
  let component: InProgressDeliveryCardComponent;
  let fixture: ComponentFixture<InProgressDeliveryCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InProgressDeliveryCardComponent]
    });
    fixture = TestBed.createComponent(InProgressDeliveryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
