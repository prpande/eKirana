import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { MapDialogComponent } from 'src/app/shared/components/map-dialog/map-dialog.component';
import { Image } from 'src/app/shared/image-manager/models/Image';
import { ImageService } from 'src/app/shared/image-manager/services/image.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { RouterService } from 'src/app/shared/services/router.service';
import { Product } from 'src/app/shop/models/product';
import { Address } from 'src/app/user/models/address';
import { AuthService } from 'src/app/user/services/auth.service';
import { UserService } from 'src/app/user/services/user.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order.service';
import {Location} from '@angular/common'

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {

  orderInfo: Order;
  carrier: Address = new Address();
  seller: Address = new Address();
  customer: Address = new Address();

  constructor(private logger: LoggerService,
    private restErrorSvc: RestErrorHandlerService,
    private routerService: RouterService,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private imageService: ImageService,
    private mapDialog: MatDialog,
    private location: Location) {
    this.orderInfo = new Order();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(data => {
      let orderId = data.get("orderId") ?? "";
      this.logger.info(`Getting details for order:[${orderId}]`);
      let errorMsg = `Error fetching order details for :[${orderId}]`;
      this.orderService.getOrder(orderId).subscribe({
        next: info => {
          if (!info || !info.orderId) {
            this.handleRestErrorAndGoToOrders(errorMsg);
          }
          this.orderInfo = info;
          this.populateCarrierInfo(this.orderInfo.carrierId);
          this.populateCustomerInfo(this.orderInfo.customerId);
          this.populateSellerInfo(this.orderInfo.sellerId);
        },
        error: err => {
          this.handleRestErrorAndGoToOrders(err);
        }
      })
    })
  }

  handleRestErrorAndGoToOrders(data: any) {
    this.logger.error(data);
    this.restErrorSvc.processFetchError(data);
    this.routerService.goToOrders();
  }

  populateSellerInfo(sellerId?: string) {
    if (sellerId) {
      this.userService.getOtherUserInfo(sellerId).subscribe(info => {
        this.seller = new Address(info.address);
      })
    }
  }
  populateCustomerInfo(customerId?: string) {
    if (customerId) {
      this.userService.getOtherUserInfo(customerId).subscribe(info => {
        this.customer = new Address(info.address);
      })
    }
  }
  populateCarrierInfo(carrierId?: string) {
    if (carrierId) {
      this.userService.getOtherUserInfo(carrierId).subscribe(info => {
        this.carrier = new Address(info.address);
      })
    }
  }
  get items(): Product[] {
    return this.orderInfo.orderedItems!;
  }

  get itemCount(): number {
    return this.orderInfo.orderedItems?.reduce((count, item) => {
      return count + item.quantity!;
    }, 0)!;
  }

  get isCarrierAssigned(): boolean {
    if (this.orderInfo.carrierId) {
      return true;
    }

    return false;
  }

  get deliveryAddress(): Address {
    return this.orderInfo.deliveryAddress!;
  }

  get placedOn(): string {
    return (new Date(this.orderInfo.placedOn!)).toUTCString();
  }

  get isComments(): boolean {
    if (this.orderInfo.comments) {
      return true;
    }

    return false;
  }

  get isCustomer(): boolean {
    return this.authService.isCustomer;
  }

  get isCarrier(): boolean {
    return this.authService.isCarrier;
  }

  get isSeller(): boolean {
    return this.authService.isSeller;
  }

  getImage(product: Product) {
    return this.imageService.getImage(product.imageUrl!);
  }

  getImageSrc(img: Image) {
    return this.imageService.getImageSrcString(img);
  }

  get getStatusDisplay() {
    return this.orderService.getOrderStatusDisplay(this.orderInfo);
  }

  get isInProgress(): boolean {
    return this.orderService.isOrderInProgress(this.orderInfo);
  }

  trackOrder() {
    this.userService.getOtherUserInfo(this.orderInfo.carrierId!).subscribe({
      next: carrierInfo => {
        let title = `Tracking order ${this.orderInfo.orderId}.`
        const dialogRef = this.mapDialog.open(MapDialogComponent, {
          data: {
            title: title,
            isDirection: true,
            sourceLat: carrierInfo.vehicleInfo!.latitude!,
            sourceLng: carrierInfo.vehicleInfo!.longitude!,
            destinationLat: this.deliveryAddress.latitude!,
            destinationLng: this.deliveryAddress.longitude!
          },
          width: '50vw'
        });
      },
      error: err => {
        this.restErrorSvc.processFetchError(err);
      }
    })
  }

  goBack(){
    this.location.back();
  }
}
