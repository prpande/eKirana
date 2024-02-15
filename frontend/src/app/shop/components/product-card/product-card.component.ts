import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '../../models/product';
import { AuthService } from 'src/app/user/services/auth.service';
import { UserType } from 'src/app/user/models/userType';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';
import { ProductService } from '../../services/product.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { CartService } from 'src/app/cart/services/cart.service';
import { ImageService } from 'src/app/shared/image-manager/services/image.service';
import { InteractionDialogService } from 'src/app/shared/components/interaction-dialog/service/interaction-dialog.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, AfterViewChecked {

  @Input()
  product: Product;

  @Output()
  productUpdatedEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input()
  isSearchResult: boolean = false;

  imgSrc!: string;
  showDescription: boolean = false;

  constructor(public productDialog: MatDialog,
    private authService: AuthService,
    private productService: ProductService,
    private logger: LoggerService,
    private restErrorSvc: RestErrorHandlerService,
    private cartService: CartService,
    private imageService: ImageService,
    private dialogService: InteractionDialogService,
    private cdr: ChangeDetectorRef) {
    this.product = new Product();
  }
  ngOnInit(): void {
    if (this.product && this.product.imageUrl) {
      this.imageService.getImage(this.product.imageUrl).subscribe({
        next: imgData => {
          if (imgData) {
            this.imgSrc = this.imageService.getImageSrcString(imgData);
          }
        },
        error: err => {
          this.logger.error(err);
        }
      });
    }
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  isShopOwner(): boolean {
    if (this.authService.UserCredentials.userType == UserType.SELLER && this.product.sellerId === this.authService.UserCredentials.userId) {
      return true;
    }

    return false;
  }

  isCustomer(): boolean {
    return (this.authService.UserCredentials.userType == UserType.CUSTOMER)
  }

  updateProduct() {
    const dialogRef = this.productDialog.open(EditProductDialogComponent, {
      data: {
        operation: "Add",
        productInfo: this.product
      }
    });

    dialogRef.afterClosed().subscribe(info => {
      if (info) {
        this.productService.updateProduct(this.product.productId!, info).subscribe({
          next: savedProduct => {
            this.logger.info(`Saved product:[${savedProduct.productId}]`);
            this.productUpdatedEvent.emit(true);
          },
          error: err => {
            this.restErrorSvc.processPostError(err);
          }
        })
      }
    })
  }

  deleteProduct() {
    this.dialogService.openInteractionDialog({
      isConfirmation: true,
      title: `Are you sure you want to delete product?`,
      message: `Product:[${this.product.name}]`
    }).subscribe(confirmation => {
      if (confirmation) {

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
    });
  }

  get canAddToCart() {
    return (this.product && this.product.quantity! > 0);
  }

  addProductToCart() {
    this.cartService.addToCart(this.product);    
  }

  toggleDescription(){
    this.showDescription = !this.showDescription;
  }
}
