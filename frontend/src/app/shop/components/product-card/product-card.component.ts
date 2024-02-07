import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../models/product';
import { AuthService } from 'src/app/user/services/auth.service';
import { UserType } from 'src/app/user/models/userType';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { ProductService } from '../../services/product.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input()
  product: Product;

  @Output()
  productUpdatedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public productDialog: MatDialog,
    private authService: AuthService,
    private productService: ProductService,
    private logger: LoggerService,
    private restErrorSvc: RestErrorHandlerService) {
    this.product = new Product();
  }


  isUserSeller(): boolean {
    return this.authService.UserCredentials.userType == UserType.SELLER
  }

  updateProduct() {
    const dialogRef = this.productDialog.open(EditProductDialogComponent, {
      data: {
        operation: "Add",
        productInfo: this.product
      }
    });

    dialogRef.afterClosed().subscribe(info => {
      console.log(info);
      this.productService.updateProduct(this.product.productId!, info).subscribe({
        next: savedProduct => {
          console.log(savedProduct);
          this.logger.info(`Saved product:[${savedProduct.productId}]`);
          this.productUpdatedEvent.emit(true);
        },
        error: err => {
          this.restErrorSvc.processPostError(err);
        }
      })
    })
  }

  deleteProduct() {
    this.productService.removeProduct(this.product.productId!).subscribe({
      next: data => {
        console.log(`Product delete successfully:[${this.product.productId}]`);
        this.productUpdatedEvent.emit(true);
      },
      error: err => {
        this.restErrorSvc.processPostError(err);
      }
    })
  }

  addProductToCart() { }
}
