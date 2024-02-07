import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from 'src/app/shop/models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit{

  cartItems: Product[] = [];
  cartTotal: number = 0;
  cartCount: number = 0;
  constructor(private cartService: CartService){
    cartService.cart$.subscribe(items =>{
      if(items && items.length > 0){
        this.cartItems = items;
      }
      this.cartTotal = cartService.getTotal();
      this.cartCount = cartService.getCount();
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
