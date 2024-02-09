import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { RouterService } from 'src/app/shared/services/router.service';
import { User } from 'src/app/user/models/user';
import { UserCredential } from 'src/app/user/models/userCredential';
import { UserType } from 'src/app/user/models/userType';
import { AuthService } from 'src/app/user/services/auth.service';
import { UserService } from 'src/app/user/services/user.service';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-shop-view',
  templateUrl: './shop-view.component.html',
  styleUrls: ['./shop-view.component.css']
})
export class ShopViewComponent implements OnInit {

  userInfo: UserCredential;
  shopInfo: User;
  products: Product[];

  constructor(private logger: LoggerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private restErrorSvc: RestErrorHandlerService,
    private routerService: RouterService,
    private productService: ProductService,
    public productDialog: MatDialog) {
    this.userInfo = authService.UserCredentials;
    this.shopInfo = new User();
    this.products = [];
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(data => {
      let id = data.get("shopId") ?? "";
      this.logger.info(`Getting details for seller:[${id}]`);
      let errorMsg = `Error fetching shop details for :[${id}]`;
      this.userService.getOtherUserInfo(id).subscribe({
        next: info => {
          if (!info.userId) {
            this.handleRestErrorAndGoHome(errorMsg);
          }
          this.logger.info(`Fetched shop details:[${info.userId}]`);
          this.shopInfo = info;
          this.getProductsInShop();
        },
        error: err => {
          this.handleRestErrorAndGoHome(err);
        }
      })
    }

    )
  }

  handleRestErrorAndGoHome(data: any) {
    this.logger.error(data);
    this.restErrorSvc.processFetchError(data);
    this.routerService.goToHome();
  }

  getProductsInShop() {
    this.productService.getSellerProducts(this.shopInfo.userId!).subscribe({
      next: productData => {
        this.products = productData;
      },
      error: err => {
        this.handleRestErrorAndGoHome(err);
      }
    })
  }

  addProduct() {
    this.processEditProductDialogBox();
  }

  processEditProductDialogBox() {
    const dialogRef = this.productDialog.open(EditProductDialogComponent, {
      data: {
        operation: "Add"
      }
    });

    dialogRef.afterClosed().subscribe(info => {
      if (info) {
        this.productService.createProduct(info).subscribe({
          next: savedProduct => {
            if (savedProduct) {
              this.logger.info(`Saved product:[${savedProduct.productId}]`);
              this.products.push(savedProduct);
            }
          },
          error: err => {
            this.restErrorSvc.processPostError(err);
          }
        })
      }
    })

  }

  isShopOwner(): boolean {
    if (this.userInfo.userType == UserType.SELLER && this.shopInfo.userId === this.userInfo.userId) {
      return true;
    }

    return false;
  }
}
