import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/shop/models/product';
import { CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>([]);
  get cartItems() {
    return this.cart$.value;
  }

  constructor() { }
  private updateCart(newItems: CartItem[]) {
    this.cart$.next(newItems);
  }

  addToCart(product: Product) {
    if (this.findProductId(product.productId!) > -1) {
      this.incrementItem(product.productId!);
    }
    else {
      let item: CartItem = {
        item: product,
        quantity: 1
      }
      
      let items = this.cartItems;
      items.push(item);
      this.updateCart(items);
    }
  }

  findProductId(productId: string): number {
    return this.cartItems.findIndex(item => item.item!.productId == productId);
  }
  removeFromCart(productId: string) {
    let items = this.cartItems;
    items.splice(this.findProductId(productId), 1);
    this.updateCart(items);
  }

  incrementItem(productId: string) {
    let index = this.findProductId(productId);
    let items = this.cartItems;
    items.at(index)!.quantity!++;
    this.updateCart(items);
  }

  decrementItem(productId: string) {
    let index = this.findProductId(productId);
    let items = this.cartItems;
    items.at(index)!.quantity!--;
    this.updateCart(items);

    if (this.cartItems.at(index)!.quantity! <= 0) {
      this.removeFromCart(productId);
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + item.quantity! * item.item?.price!;
    }, 0);
  }

  getCount(): number {
    return this.cartItems.reduce((total, product) => {
      return total + product.quantity!;
    }, 0);
  }

  placeOrder() { }
}
