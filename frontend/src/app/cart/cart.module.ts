import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CartViewComponent } from './components/cart-view/cart-view.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartTotalComponent } from './components/cart-total/cart-total.component';



@NgModule({
  declarations: [
    CartViewComponent,
    CartItemComponent,
    CartTotalComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    CartViewComponent
  ]
})
export class CartModule { }
