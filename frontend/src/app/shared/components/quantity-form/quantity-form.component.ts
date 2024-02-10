import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { CartItem } from 'src/app/cart/models/cart';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
  selector: 'app-quantity-form',
  templateUrl: './quantity-form.component.html',
  styleUrls: ['./quantity-form.component.css']
})
export class QuantityFormComponent implements OnInit{
  @Input()
  cartItem!: CartItem;

  @Input()
  isReadOnly: boolean = false;
  
  itemQuantityControl: FormControl = new FormControl('');


  constructor(private fb: FormBuilder, private cartService: CartService) { }
  ngOnInit(): void {
    if (this.cartItem) {
      this.itemQuantityControl.setValue(this.cartItem.quantity);
    }
    this.cartService.cart$.subscribe(() => {
      this.itemQuantityControl.setValue(this.cartService.cart$.value.find(item => item.item?.productId == this.cartItem.item?.productId)?.quantity);
    })
  }

  checkQuantity() {
    if (!this.shouldIncrement()) {
      this.itemQuantityControl.setValue(this.cartItem.item?.quantity);
    }
  }
  incrementQuantity() {
    if (this.shouldIncrement()) {
      this.itemQuantityControl.setValue(this.itemQuantityControl.value + 1);
      this.cartService.incrementItem(this.cartItem.item?.productId!);
    }
  }
  decrementQuantity() {
    this.itemQuantityControl.setValue(this.itemQuantityControl.value - 1);
    this.cartService.decrementItem(this.cartItem.item?.productId!);
  }

  shouldDelete() {
    return this.itemQuantityControl.value == 1
  }
  shouldIncrement() {
    return (this.itemQuantityControl.value < this.cartItem.item?.quantity!);
  }
}
