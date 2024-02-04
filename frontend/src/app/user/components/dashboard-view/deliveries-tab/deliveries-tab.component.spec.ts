import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesTabComponent } from './deliveries-tab.component';

describe('DeliveriesTabComponent', () => {
  let component: DeliveriesTabComponent;
  let fixture: ComponentFixture<DeliveriesTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeliveriesTabComponent]
    });
    fixture = TestBed.createComponent(DeliveriesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
