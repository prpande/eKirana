import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopViewComponent } from '../components/shop-view/shop-view.component';

describe('ShopViewComponent', () => {
  let component: ShopViewComponent;
  let fixture: ComponentFixture<ShopViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopViewComponent]
    });
    fixture = TestBed.createComponent(ShopViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
