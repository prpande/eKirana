import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/cart/models/cart';

@Component({
  selector: 'app-checkout-item-card',
  templateUrl: './checkout-item-card.component.html',
  styleUrls: ['./checkout-item-card.component.css']
})
export class CheckoutItemCardComponent {
  @Input()
  cartItem!: CartItem;  
}
