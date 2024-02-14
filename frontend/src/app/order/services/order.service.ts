import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { OrderRestEndpointsService } from './order-rest-endpoints.service';
import { OrderStatus } from '../models/orderStatus';
import { AuthService } from 'src/app/user/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpCLient: HttpClient,
    private authService: AuthService) { }

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

  cancelOrder(orderId: string, comment: string): Observable<Order> {
    let fmtComment = `[${Date.now().toString()}] : Order cancellation by User:[${this.authService.UserCredentials.userId}] : ${comment};`
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

  isOrderInProgress(order: Order): boolean {
    return order && order.status != OrderStatus.CANCELLED && order.status != OrderStatus.DELIVERED;
  }

  canOrderCancelRequest(order: Order): boolean {
    return order && order.status != OrderStatus.CANCELLED && 
    order.status != OrderStatus.CANCELLATION_REQUESTED && 
    order.status != OrderStatus.DELIVERED;
  }

  getOrderStatusDisplay(order: Order) {
    let statusDisplay = {
      class: "",
      icon: "icon",
      text: ""
    }
    switch (order.status) {
      case OrderStatus.INITIALIZED:
        statusDisplay.class = "text-info";
        statusDisplay.icon = "priority_high";
        statusDisplay.text = "Initialized"
        break;
      case OrderStatus.CONFIRMED:
        statusDisplay.class = "text-primary";
        statusDisplay.icon = "check";
        statusDisplay.text = "Confirmed"
        break;
      case OrderStatus.SHIPPED:
        statusDisplay.class = "text-warning";
        statusDisplay.icon = "local_shipping";
        statusDisplay.text = "Shipped"
        break;
      case OrderStatus.DELIVERED:
        statusDisplay.class = "text-success";
        statusDisplay.icon = "where_to_vote";
        statusDisplay.text = "Delivered"
        break;
      case OrderStatus.CANCELLED:
        statusDisplay.class = "text-danger";
        statusDisplay.icon = "cancel";
        statusDisplay.text = "Cancelled"
        break;
      case OrderStatus.CANCELLATION_REQUESTED:
        statusDisplay.class = "text-danger";
        statusDisplay.icon = "error_outline";
        statusDisplay.text = "Cancellation Requested"
        break;
    }

    return statusDisplay;
  }
}
