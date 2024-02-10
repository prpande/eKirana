import { NgModule } from '@angular/core';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SharedModule } from '../shared/shared.module';
import { CheckoutItemCardComponent } from './components/checkout-item-card/checkout-item-card.component';
import { AddressSelectorComponent } from './components/address-selector/address-selector.component';
import { UserModule } from '../user/user.module';
import { OrdersTabComponent } from './components/orders-tab/orders-tab.component';
import { OrderPageComponent } from './components/order-page/order-page.component';



@NgModule({
  declarations: [
    OrderCardComponent,
    CheckoutComponent,
    PaymentComponent,
    CheckoutItemCardComponent,
    AddressSelectorComponent,
    OrdersTabComponent,
    OrderPageComponent
  ],
  imports: [
    SharedModule,
    UserModule,
  ],
  exports:[
    OrderCardComponent
  ]
})
export class OrderModule { }
