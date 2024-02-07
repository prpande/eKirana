import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShopViewComponent } from './components/shop-view/shop-view.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ShopCardComponent } from './components/shop-card/shop-card.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { EditProductDialogComponent } from './components/edit-product-dialog/edit-product-dialog.component';



@NgModule({
  declarations: [
    ShopViewComponent,
    ProductCardComponent,
    ShopCardComponent,
    ProductDetailsComponent,
    ProductFormComponent,
    EditProductDialogComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    ShopViewComponent,
    ProductCardComponent,
    ShopCardComponent,
    ProductDetailsComponent
  ]
})
export class ShopModule { }
