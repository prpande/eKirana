import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DeliveryHubViewComponent } from './components/delivery-hub-view/delivery-hub-view.component';



@NgModule({
  declarations: [
    DeliveryHubViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DeliveryModule { }
