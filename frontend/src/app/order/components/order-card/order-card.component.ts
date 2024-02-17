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
import { InteractionDialogService } from 'src/app/shared/components/interaction-dialog/service/interaction-dialog.service';

@Component({
  selector: '[app-order-card]',
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
    private logger: LoggerService,
    private dialogService: InteractionDialogService) { }

  get placedOnDate(): string {
    return (new Date(this.order.placedOn!.toString())).toDateString();
  }

  get placedOnTime(): string {
    return (new Date(this.order.placedOn!.toString())).toLocaleTimeString();
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
    return ((this.isSeller && (this.order.status != OrderStatus.DELIVERED && this.order.status != OrderStatus.SHIPPED && this.order.status != OrderStatus.CANCELLED)) ||
      (this.isCustomer && (this.order.status != OrderStatus.CANCELLATION_REQUESTED && this.order.status != OrderStatus.DELIVERED && this.order.status != OrderStatus.CANCELLED)))
  }

  get isConfirmable(): boolean {
    return this.isSeller && (this.order.status == OrderStatus.INITIALIZED || this.order.status == OrderStatus.CANCELLATION_REQUESTED);
  }

  confirmOrder() {
    this.dialogService.openInteractionDialog({
      isConfirmation: true,
      title: `Are you sure you want to confirm this order?`,
      message: `Order:[${this.order.orderId}]`
    }).subscribe(confirmation => {
      if (confirmation) {
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
    })
  }

  cancelOrder() {
    if (this.isCancellable) {
      this.dialogService.openInteractionDialog({
        isConfirmation: true,
        title: `Are you sure you want to cancel this order?`,
        message: `Order:[${this.order.orderId}]`
      }).subscribe(confirmation => {
        if (confirmation) {

          this.orderService.cancelOrder(this.order.orderId!, "test").subscribe({
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
      });
    }
  }

  get shortId(): string {
    let idSubStr = this.order.orderId?.split("-")[4];
    return idSubStr!;
  }

  get getStatusDisplay() {
    return this.orderService.getOrderStatusDisplay(this.order);
  }
}
