import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/shop/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Product[]>= new BehaviorSubject<Product[]>([]);
  get cartItems(){
    return this.cart$.value;
  }

  constructor() { }
  private updateCart(newItems: Product[]){
    this.cart$.next(newItems);
  }

  addToCart(product: Product) {
    product.quantity = 1;
    let items = this.cartItems;
    items.push(product);
    this.updateCart(items);
  }

  findProductId(productId: string): number {
    return this.cartItems.findIndex(product => product.productId == productId);
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
    return this.cartItems.reduce((total, product) => {
      return total + product.quantity! * product.price!;
    }, 0);
  }

  getCount(): number{
    return this.cartItems.reduce((total, product) => {
      return total + product.quantity!;
    }, 0);
  }

  placeOrder(){}
}
