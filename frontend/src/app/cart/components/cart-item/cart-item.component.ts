import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/shop/models/product';
import { CartItem } from '../../models/cart';
import { CartService } from '../../services/cart.service';
import { QuantityFormComponent } from 'src/app/shared/components/quantity-form/quantity-form.component';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input()
  cartItem!: CartItem;
}
