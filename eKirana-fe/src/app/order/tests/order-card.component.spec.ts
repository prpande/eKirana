import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCardComponent } from '../components/order-card/order-card.component';

describe('OrderCardComponent', () => {
  let component: OrderCardComponent;
  let fixture: ComponentFixture<OrderCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderCardComponent]
    });
    fixture = TestBed.createComponent(OrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
