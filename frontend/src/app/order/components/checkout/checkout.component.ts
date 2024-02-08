import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/cart/models/cart';
import { CartService } from 'src/app/cart/services/cart.service';
import { LoggerService } from 'src/app/shared/components/logger/services/logger.service';
import { IdGeneratorService } from 'src/app/shared/services/id-generator.service';
import { Product } from 'src/app/shop/models/product';
import { Address } from 'src/app/user/models/address';
import { AuthService } from 'src/app/user/services/auth.service';
import { Order } from '../../models/order';
import { OrderStatus } from '../../models/orderStatus';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  
  orders: Order[] = [];
  deliveryAddress!: Address;
  comments!: string;
  
  cart:CartItem[] = [];

  constructor(
    private logger: LoggerService,
    private authService: AuthService,
    private idGenerator: IdGeneratorService,
    private cartService: CartService) { }
    
  ngOnInit(): void {
    this.cartService.cart$.subscribe(()=>{
      this.cart = [...this.cartService.cartItems];
    })
  }

  placeOrder(cart: CartItem[], deliveryAddress: Address, comments: string) { 
    
  }

  createOrders(cart: CartItem[]) {
    let products: Product[] = this.covertToProductArray(cart);

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
    order.totalAmount = this.cartService.getTotal();
    order.deliveryAddress = this.deliveryAddress;
    order.status = OrderStatus.INITIALIZED;
    order.placedOn = new Date();
    order.customerId = this.authService.UserCredentials.userId;
    order.sellerId = product.sellerId;
    order.comments = this.comments;
    this.logger.info(`New Order:[${order.orderId}] Customer:[${order.customerId}] Seller:[${order.sellerId}] Address:[${order.deliveryAddress.addressId}]`);
    return order;
  }
}
