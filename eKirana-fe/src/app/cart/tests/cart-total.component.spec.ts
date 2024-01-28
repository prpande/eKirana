import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTotalComponent } from '../components/cart-total/cart-total.component';

describe('CartTotalComponent', () => {
  let component: CartTotalComponent;
  let fixture: ComponentFixture<CartTotalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartTotalComponent]
    });
    fixture = TestBed.createComponent(CartTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
