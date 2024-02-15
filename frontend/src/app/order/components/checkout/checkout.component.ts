import { Component, OnInit, ViewChild } from '@angular/core';
import { CartItem } from 'src/app/cart/models/cart';
import { CartService } from 'src/app/cart/services/cart.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { IdGeneratorService } from 'src/app/shared/services/id-generator.service';
import { Product } from 'src/app/shop/models/product';
import { Address } from 'src/app/user/models/address';
import { AuthService } from 'src/app/user/services/auth.service';
import { Order } from '../../models/order';
import { OrderStatus } from '../../models/orderStatus';
import { RouterService } from 'src/app/shared/services/router.service';
import { AddressSelectorComponent } from '../address-selector/address-selector.component';
import { OrderService } from '../../services/order.service';
import { BehaviorSubject } from 'rxjs';
import { RestErrorHandlerService } from 'src/app/shared/services/rest-error-handler.service';
import { InteractionDialogService } from 'src/app/shared/components/interaction-dialog/service/interaction-dialog.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  @ViewChild(AddressSelectorComponent) addressSelector!: AddressSelectorComponent;

  orders: Order[] = [];
  successfulOrders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);

  deliveryAddress!: Address;
  comments!: string;

  cart: CartItem[] = [];
  cartTotal: number = 0;
  cartCount: number = 0;

  constructor(
    private logger: LoggerService,
    private authService: AuthService,
    private idGenerator: IdGeneratorService,
    private cartService: CartService,
    private routerService: RouterService,
    private orderService: OrderService,
    private dialogService: InteractionDialogService,
    private restErrorSvc: RestErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(() => {
      this.cart = [...this.cartService.cartItems];
      this.cartTotal = this.cartService.getTotal();
      this.cartCount = this.cartService.getCount();
    })
  }

  processOrders() {
    this.orders.forEach(order => {
      this.placeOrder(order);
    })
  }

  placeOrder(order: Order) {
    this.logger.info(`Placing order:[${order.orderId}] customer:[${order.customerId}] total:[${order.totalAmount}]`);
    this.orderService.placeOrder(order).subscribe({
      next: orderPlaced => {
        this.orderSuccess(orderPlaced);
      },
      error: err => {
        this.orderFailed(order, err);
      }
    })
  }

  orderSuccess(orderPlaced: Order) {
    this.logger.info(`Order:[${orderPlaced.orderId}] placed successfully`);
    let orderArr = this.successfulOrders.getValue();
    orderArr.push(orderPlaced);
    this.successfulOrders.next(orderArr);

  }

  orderFailed(order: Order, error: any) {
    this.logger.error(`Order:[${order.orderId}] failed.`);
    this.successfulOrders.error(error);
    this.restErrorSvc.processPostError(error);
  }

  createOrders() {
    let products: Product[] = this.covertToProductArray(this.cart);

    products.forEach(product => {
      let index = this.findSellerInOrders(product.sellerId!);
      if (index > -1) {
        let order = this.orders.at(index);
        order?.orderedItems?.push(product);
        this.logger.info(`Added Product:[${product.productId}] to Order:[${order?.orderId}]`);
      } else {
        let order = this.initializeOrder(product);
        this.orders.push(order);
      }
    })

    this.orders.forEach(order => {
      order.setTotal();
    })
  }

  private covertToProductArray(cart: CartItem[]): Product[] {
    let productArray: Product[] = [];
    cart.forEach(item => {
      let p: Product = item.item!;
      p.quantity = item.quantity;
      productArray.push(p);
    })

    return productArray;
  }

  private findSellerInOrders(sellerId: string): number {
    return this.orders.findIndex(order => order.sellerId == sellerId);
  }

  private initializeOrder(product: Product): Order {
    let order = new Order();
    order.orderId = this.idGenerator.generateId();
    order.orderedItems = [product];
    order.totalAmount = order.getTotal();
    order.deliveryAddress = this.deliveryAddress;
    order.status = OrderStatus.INITIALIZED;
    order.placedOn = new Date();
    order.customerId = this.authService.UserCredentials.userId;
    order.sellerId = product.sellerId;
    order.comments = this.comments;
    this.logger.info(`New Order:[${order.orderId}] Customer:[${order.customerId}] Seller:[${order.sellerId}] Address:[${order.deliveryAddress.addressId}]`);
    return order;
  }

  isCartEmpty(): boolean {
    return this.cart.length == 0;
  }

  setDeliveryAddress() {
    this.deliveryAddress = this.addressSelector.getSelectedAddress();
  }

  get canCheckout(): boolean {
    if (this.addressSelector) {
      return this.addressSelector.getSelectedAddress().addressId != null
    }

    return false;
  }

  proceedToPayment() {

    this.dialogService.openInteractionDialog({
      isConfirmation: true,
      title: `Are you sure you want to place the order?`,
      message: `Total: \u20B9 ${this.cartTotal}`
    }).subscribe(confirmation => {
      if (confirmation) {
        this.setDeliveryAddress();
        this.createOrders();

        this.successfulOrders = new BehaviorSubject<Order[]>([]);
        this.successfulOrders.subscribe({
          next: ordersSuccess => {
            if (ordersSuccess.length == this.orders.length) {
              this.logger.info("All orders placed successfully!");

              this.dialogService.openInteractionDialog({
                isConfirmation: false,
                title: `Order placed Successfully!`,
                message: ""
              }).subscribe(() => {
                this.cartService.clearCart();
                this.routerService.goToHome();
              });
            }
          },
          error: err => {
            this.logger.error("All orders not placed successfully!");
            this.logger.error(err);
          }
        });

        this.processOrders();
      }
    });
  }
}
