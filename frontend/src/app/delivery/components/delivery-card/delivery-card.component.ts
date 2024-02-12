import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/order/models/order';
import { OrderStatus } from 'src/app/order/models/orderStatus';
import { OrderService } from 'src/app/order/services/order.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
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
    private restErrorSvc: RestErrorHandlerService) { }

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

  get isAcceptable(): boolean{
    return this.order.status == OrderStatus.CONFIRMED && !this.order.carrierId;
  }
  get isInProgress(): boolean {
    return this.orderService.isOrderInProgress(this.order);
  }

  get isShipped(): boolean {
    return this.order && this.order.status == OrderStatus.SHIPPED;
  }

  get isCancellable(): boolean {
    return this.orderService.canOrderCancelRequest(this.order);
  }
  
  acceptOrder() {
    if (!this.isInProgress) {
      let answer = confirm(`Are you sure you want to deliver Order:[${this.order.orderId}]?`);
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
    }
  }

  shipOrder() {
    if (this.isInProgress && !this.isShipped) {
      let answer = confirm(`Are you sure you want to ship Order:[${this.order.orderId}]?`);
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
    }
  }

  deliverOrder() { 
    if (this.isInProgress && this.isShipped) {
      let answer = confirm(`Are you sure you want to deliver Order:[${this.order.orderId}]?`);
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
    }
  }

  cancelOrder() { 
    if (this.isInProgress) {
      let answer = confirm(`Are you sure you want to cancel Order:[${this.order.orderId}]?`);
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
    }
  }
}
