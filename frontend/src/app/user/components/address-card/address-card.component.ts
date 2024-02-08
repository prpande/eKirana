import { Component, Input } from '@angular/core';
import { Address } from '../../models/address';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.css']
})
export class AddressCardComponent {
  @Input()
  address!: Address;

  isLine2(): boolean {
    if (this.address.line2?.trim().length! > 0) {
      return true;
    }

    return false;
  }
  isLandmark(): boolean {
    if (this.address.landmark?.trim().length! > 0) {
      return true;
    }

    return false;
  }
}
