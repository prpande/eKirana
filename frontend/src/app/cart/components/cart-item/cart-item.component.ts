import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shop/models/product';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input()
  item!: Product;
}
