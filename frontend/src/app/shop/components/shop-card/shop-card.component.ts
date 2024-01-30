import { Component, Input } from '@angular/core';
import { Address } from 'src/app/user/models/address';

@Component({
  selector: 'app-shop-card',
  templateUrl: './shop-card.component.html',
  styleUrls: ['./shop-card.component.css']
})
export class ShopCardComponent {

  @Input()
  shop?: Address;
}
