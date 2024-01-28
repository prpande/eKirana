import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShopViewComponent } from './components/shop-view/shop-view.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ShopCardComponent } from './components/shop-card/shop-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';



@NgModule({
  declarations: [
    ShopViewComponent,
    ProductCardComponent,
    ShopCardComponent,
    ProductDetailsComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ShopModule { }
