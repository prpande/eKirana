import { NgModule } from '@angular/core';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    OrderCardComponent,
    CheckoutComponent,
    PaymentComponent
  ],
  imports: [
    SharedModule
  ]
})
export class OrderModule { }
