import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from '../../models/order';
import { Product } from 'src/app/shop/models/product';
import { RouterService } from 'src/app/shared/services/router.service';
import { AuthService } from 'src/app/user/services/auth.service';
import { UserType } from 'src/app/user/models/userType';
import { OrderStatus } from '../../models/orderStatus';
import { OrderService } from '../../services/order.service';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent {
  @Input()
  order!: Order;

  @Output()
  orderUpdatedEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private routerService: RouterService,
    private authService: AuthService,
    private orderService: OrderService,
    private restErrorSvc: RestErrorHandlerService,
    private logger: LoggerService) { }

  get placedOn(): string {
    return (new Date(this.order.placedOn!.toString())).toUTCString();
  }

  get items(): Product[] {
    return this.order.orderedItems!;
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

  get isCancellable(): boolean {
    return (this.isSeller && (this.order.status != OrderStatus.DELIVERED && this.order.status != OrderStatus.SHIPPED)) ||
    (this.isCustomer && (this.order.status != OrderStatus.CANCELLATION_REQUESTED && this.order.status != OrderStatus.DELIVERED));
  }

  get isConfirmable(): boolean {
    return this.isSeller && (this.order.status == OrderStatus.INITIALIZED || this.order.status == OrderStatus.CANCELLATION_REQUESTED) ;
  }

  confirmOrder() {
    this.orderService.confirmOrder(this.order.orderId!).subscribe({
      next: updatedOrder => {
        this.logger.info(`Order Confirmed:[${updatedOrder.orderId}]`);
        this.order = updatedOrder;
        this.orderUpdatedEvent.emit(this.order);
      },
      error: err => {
        this.logger.error(`Error confirming order:[${this.order.orderId}]`);
        this.restErrorSvc.processPostError(err);
      }
    })
  }

  cancelOrder() {
    let confirmation = confirm(`Are your sure you want to cancel order:[${this.order.orderId}]?`);
    if (confirmation) {

      this.orderService.cancelOrder(this.order.orderId!).subscribe({
        next: updatedOrder => {
          this.logger.info(`Order cancelled:[${updatedOrder.orderId}]`);
          this.order = updatedOrder;
          this.orderUpdatedEvent.emit(this.order);
        },
        error: err => {
          this.logger.error(`Error cancelling order:[${this.order.orderId}]`);
          this.restErrorSvc.processPostError(err);
        }
      })
    }
  }
  get shortId(): string{
    let idSubStr = this.order.orderId?.split("-")[4];
    return `... - ${idSubStr}`
  }
}
