import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart';
import { RouterService } from 'src/app/shared/services/router.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent{

  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  cartCount: number = 0;
  constructor(private cartService: CartService, private routerService: RouterService){
    cartService.cart$.subscribe(items =>{
      if(items && items.length > 0){
        this.cartItems = [...items];
      }
      this.cartTotal = cartService.getTotal();
      this.cartCount = cartService.getCount();
    })
  }

  checkOut(){
    this.routerService.goToCheckOut();
  }
}
