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

  getAllOrdersByUser(userId: string): Observable<Order[]> {
    return this.httpCLient.get<Order[]>(OrderRestEndpointsService.GET_ALL_ORDERS_BY_USER_ID(userId));
  }

  getOrdersAvailableForDelivery(): Observable<Order[]> {
    return this.httpCLient.get<Order[]>(OrderRestEndpointsService.GET_ORDERS_AVAILABLE_FOR_DELIVERY);
  }

  cancelOrder(orderId: string): Observable<Order> {
    return this.httpCLient.put<Order>(OrderRestEndpointsService.CANCEL_ORDER(orderId), OrderStatus.CANCELLED);
  }

  updateOrderStatus(orderId: string, status: OrderStatus): Observable<Order> {
    return this.httpCLient.put<Order>(OrderRestEndpointsService.UPDATE_ORDER_STATUS(orderId), status);
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
