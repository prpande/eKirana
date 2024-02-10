import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { OrderRestEndpointsService } from './order-rest-endpoints.service';
import { OrderStatus } from '../models/orderStatus';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpCLient: HttpClient) { }

  placeOrder(order: Order): Observable<Order> {
    return this.httpCLient.post<Order>(OrderRestEndpointsService.PLACE_ORDER, order);
  }

  getOrder(orderId: string): Observable<Order> {
    return this.httpCLient.get<Order>(OrderRestEndpointsService.GET_ORDER_BY_ID(orderId));
  }

  getAllOrdersByUser(): Observable<Order[]> {
    return this.httpCLient.get<Order[]>(OrderRestEndpointsService.GET_ALL_ORDERS_BY_USER_ID());
  }

  getOrdersAvailableForDelivery(): Observable<Order[]> {
    return this.httpCLient.get<Order[]>(OrderRestEndpointsService.GET_ORDERS_AVAILABLE_FOR_DELIVERY);
  }

  cancelOrder(orderId: string): Observable<Order> {
    return this.httpCLient.put<Order>(OrderRestEndpointsService.CANCEL_ORDER(orderId), OrderStatus.CANCELLED);
  }

  confirmOrder(orderId: string): Observable<Order> {
    return this.httpCLient.put<Order>(OrderRestEndpointsService.CONFIRM_ORDER(orderId), OrderStatus.CONFIRMED);
  }

  shipOrder(orderId: string): Observable<Order> {
    return this.httpCLient.put<Order>(OrderRestEndpointsService.SHIP_ORDER(orderId), OrderStatus.SHIPPED);
  }

  deliverOrder(orderId: string): Observable<Order> {
    return this.httpCLient.put<Order>(OrderRestEndpointsService.DELIVER_ORDER(orderId), OrderStatus.DELIVERED);
  }

  updateOrderCarrier(orderId: string, carrierId: string): Observable<Order> {
    return this.httpCLient.put<Order>(OrderRestEndpointsService.UPDATE_ORDER_CARRIER(orderId), carrierId);
  }

  updateOrderComments(orderId: string, comments: string): Observable<Order> {
    return this.httpCLient.put<Order>(OrderRestEndpointsService.UPDATE_ORDER_COMMENTS(orderId), comments);
  }

  updateOrderDeliveryDate(orderId: string, date: Date): Observable<Order> {
    return this.httpCLient.put<Order>(OrderRestEndpointsService.UPDATE_ORDER_DELIVERY_DATE(orderId), date);
  }
}
