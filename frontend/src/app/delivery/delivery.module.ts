import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DeliveryHubViewComponent } from './components/delivery-hub-view/delivery-hub-view.component';
import { AvailableDeliveriesComponent } from './components/available-deliveries/available-deliveries.component';
import { InProgressDeliveriesComponent } from './components/in-progress-deliveries/in-progress-deliveries.component';
import { AvailableDeliveryCardComponent } from './components/available-delivery-card/available-delivery-card.component';
import { InProgressDeliveryCardComponent } from './components/in-progress-delivery-card/in-progress-delivery-card.component';
import { UserModule } from '../user/user.module';
import { OrderCardComponent } from '../order/components/order-card/order-card.component';
import { OrderModule } from '../order/order.module';



@NgModule({
  declarations: [
    DeliveryHubViewComponent,
    AvailableDeliveriesComponent,
    InProgressDeliveriesComponent,
    AvailableDeliveryCardComponent,
    InProgressDeliveryCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserModule, 
    OrderModule
  ]
})
export class DeliveryModule { }
