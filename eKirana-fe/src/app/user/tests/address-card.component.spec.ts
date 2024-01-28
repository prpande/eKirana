import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCardComponent } from '../components/address-card/address-card.component';

describe('AddressCardComponent', () => {
  let component: AddressCardComponent;
  let fixture: ComponentFixture<AddressCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddressCardComponent]
    });
    fixture = TestBed.createComponent(AddressCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
