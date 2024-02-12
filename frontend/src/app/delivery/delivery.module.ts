import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DeliveryHubViewComponent } from './components/delivery-hub-view/delivery-hub-view.component';
import { AvailableDeliveriesComponent } from './components/available-deliveries/available-deliveries.component';
import { InProgressDeliveriesComponent } from './components/in-progress-deliveries/in-progress-deliveries.component';
import { DeliveryCardComponent } from './components/delivery-card/delivery-card.component';
import { InProgressDeliveryCardComponent } from './components/in-progress-delivery-card/in-progress-delivery-card.component';
import { UserModule } from '../user/user.module';
import { OrderModule } from '../order/order.module';
import { MyDeliveriesComponent } from './components/my-deliveries/my-deliveries.component';



@NgModule({
  declarations: [
    DeliveryHubViewComponent,
    AvailableDeliveriesComponent,
    InProgressDeliveriesComponent,
    DeliveryCardComponent,
    InProgressDeliveryCardComponent,
    MyDeliveriesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserModule, 
    OrderModule
  ]
})
export class DeliveryModule { }
