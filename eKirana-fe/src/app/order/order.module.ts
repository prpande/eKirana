import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';



@NgModule({
  declarations: [
    OrderCardComponent,
    CheckoutComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class OrderModule { }
