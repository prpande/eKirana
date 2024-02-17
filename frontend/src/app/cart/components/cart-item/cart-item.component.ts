import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cart';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input()
  cartItem!: CartItem;

  constructor(private cartService: CartService){}
  removeItem(){
    this.cartService.removeFromCart(this.cartItem.item?.productId!);
  }
}
