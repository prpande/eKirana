import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order } from 'src/app/order/models/order';
import { OrderStatus } from 'src/app/order/models/orderStatus';
import { OrderService } from 'src/app/order/services/order.service';
import { InteractionDialogService } from 'src/app/shared/components/interaction-dialog/service/interaction-dialog.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { MapDialogComponent } from 'src/app/shared/components/map-dialog/map-dialog.component';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { Address } from 'src/app/user/models/address';
import { AuthService } from 'src/app/user/services/auth.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-delivery-card',
  templateUrl: './delivery-card.component.html',
  styleUrls: ['./delivery-card.component.css']
})
export class DeliveryCardComponent implements OnInit {
  @Input()
  order!: Order;

  @Output()
  refreshOrders: EventEmitter<any> = new EventEmitter<any>();

  seller!: Address;
  isInitialized = false

  constructor(private logger: LoggerService,
    private authService: AuthService,
    private orderService: OrderService,
    private userService: UserService,
    private restErrorSvc: RestErrorHandlerService,
    private mapDialog: MatDialog,
    private dialogService: InteractionDialogService) { }

  ngOnInit(): void {
    if (this.order) {
      this.userService.getShops().subscribe({
        next: shops => {
          if (shops && shops.length > 0) {
            let foundSeller = shops.find(shop => shop.userId == this.order.sellerId);
            if (foundSeller) {
              this.seller = foundSeller;
              this.logger.info(`Shop for delivery:[${this.seller.fullName}]`);
              this.isInitialized = true;
            }
          }
        },
        error: err => {
          this.logger.error(err);
        }
      })
    }
  }

  get destination(): Address {
    return this.order.deliveryAddress!;
  }

  get isAcceptable(): boolean {
    return this.order.status == OrderStatus.CONFIRMED && !this.order.carrierId;
  }
  get isInProgress(): boolean {
    return this.orderService.isOrderInProgress(this.order);
  }

  get canMarkShipped(): boolean {
    return this.isAssigned && this.isInProgress && this.order.status != OrderStatus.SHIPPED;
  }

  get canMarkDelivered(): boolean {
    return this.isAssigned && this.order && this.order.status == OrderStatus.SHIPPED;
  }

  get isAssigned(): boolean {
    return this.authService.UserCredentials.userId! == this.order.carrierId
  }
  get isCancellable(): boolean {
    return this.isAssigned && this.orderService.canOrderCancelRequest(this.order);
  }
  get isDelivered(): boolean {
    return this.order.status == OrderStatus.DELIVERED;
  }
  get isCancelled(): boolean {
    console.log(this.order.status == OrderStatus.CANCELLED || this.order.status == OrderStatus.CANCELLATION_REQUESTED);
    return (this.order.status == OrderStatus.CANCELLED || this.order.status == OrderStatus.CANCELLATION_REQUESTED);
  }
  acceptOrder() {
    if (this.isAcceptable) {
      this.dialogService.openInteractionDialog({
        isConfirmation: true,
        title: `Are you sure you want to accept this order for delivery?`,
        message: `Order:[${this.order.orderId}]`
      }).subscribe(answer => {
        if (answer) {
          this.orderService.updateOrderCarrier(this.order.orderId!, this.authService.UserCredentials.userId!).subscribe({
            next: info => {
              if (info) {
                this.logger.info(`Assigned Carrier:[${info.carrierId}] for Order:[${info.orderId}]`);
                this.refreshOrders.emit();
              }
            },
            error: err => {
              this.refreshOrders.emit();
              this.restErrorSvc.processPostError(err);
            }
          });
        }
      });
    }
  }

  shipOrder() {
    if (this.canMarkShipped) {
      this.dialogService.openInteractionDialog({
        isConfirmation: true,
        title: `Are you sure you want to mark order as shipped?`,
        message: `Order:[${this.order.orderId}]`
      }).subscribe(answer => {
        if (answer) {
          this.orderService.shipOrder(this.order.orderId!).subscribe({
            next: info => {
              if (info) {
                this.logger.info(`Shipped Order:[${info.orderId}]`);
                this.refreshOrders.emit();
              }
            },
            error: err => {
              this.refreshOrders.emit();
              this.restErrorSvc.processPostError(err);
            }
          });
        }
      });
    }
  }

  deliverOrder() {
    if (this.canMarkDelivered) {
      this.dialogService.openInteractionDialog({
        isConfirmation: true,
        title: `Are you sure you want to accept mark order as delivered?`,
        message: `Order:[${this.order.orderId}]`
      }).subscribe(answer => {
        if (answer) {
          this.orderService.deliverOrder(this.order.orderId!).subscribe({
            next: info => {
              if (info) {
                this.logger.info(`Delivered Order:[${info.orderId}]`);
                this.refreshOrders.emit();
              }
            },
            error: err => {
              this.refreshOrders.emit();
              this.restErrorSvc.processPostError(err);
            }
          });
        }
      });
    }
  }

  cancelOrder() {
    if (this.isInProgress) {
      this.dialogService.openInteractionDialog({
        isConfirmation: true,
        title: `Are you sure you want to cancel this order?`,
        message: `Order:[${this.order.orderId}]`
      }).subscribe(answer => {
        if (answer) {
          this.orderService.cancelOrder(this.order.orderId!, "test").subscribe({
            next: info => {
              if (info) {
                this.logger.info(`Cancelled Order:[${info.orderId}]`);
                this.refreshOrders.emit();
              }
            },
            error: err => {
              this.refreshOrders.emit();
              this.restErrorSvc.processPostError(err);
            }
          });
        }
      });
    }
  }

  getDirections() {
    let title = `Directions from ${this.seller.fullName} to ${this.destination.fullName}.`
    const dialogRef = this.mapDialog.open(MapDialogComponent, {
      data: {
        title: title,
        isDirection: true,
        sourceLat: this.seller.latitude!,
        sourceLng: this.seller.longitude!,
        destinationLat: this.destination.latitude!,
        destinationLng: this.destination.longitude!
      },
      width: '50vw'
    });
  }
}
