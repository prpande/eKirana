import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderRestEndpointsService {

  // Order Service endpoints
  public static readonly ORDER_SERVICE_URL: string = "http://localhost:8084";

  public static readonly ORDER_ROOT: string = OrderRestEndpointsService.ORDER_SERVICE_URL + "/api/order";
  public static readonly PLACE_ORDER: string = OrderRestEndpointsService.ORDER_ROOT + "/";
  public static readonly GET_ALL_ORDERS_BY_USER_ID: string = OrderRestEndpointsService.ORDER_ROOT + "/user/{userId}";
  public static readonly GET_ALL_ORDERS: string = OrderRestEndpointsService.ORDER_ROOT + "/orders";
  public static readonly GET_ORDERS_AVAILABLE_FOR_DELIVERY: string = OrderRestEndpointsService.ORDER_ROOT + "/delivery";
  public static readonly GET_ORDER_BY_ID: string = OrderRestEndpointsService.ORDER_ROOT + "/{orderId}";
  public static readonly CANCEL_ORDER: string = OrderRestEndpointsService.ORDER_ROOT + "/{orderId}";
  public static readonly UPDATE_ORDER_STATUS: string = OrderRestEndpointsService.ORDER_ROOT + "/{orderId}/status";
  public static readonly UPDATE_ORDER_CARRIER: string = OrderRestEndpointsService.ORDER_ROOT + "/{orderId}/carrier";
  public static readonly UPDATE_ORDER_COMMENTS: string = OrderRestEndpointsService.ORDER_ROOT + "/{orderId}/comments";
  public static readonly UPDATE_ORDER_DELIVERY_DATE: string = OrderRestEndpointsService.ORDER_ROOT + "/{orderId}/deliveryDate";
  public static readonly ORDER_SECURE_PATTERNS: string[] = [OrderRestEndpointsService.ORDER_ROOT + "/*"];

  constructor() { }
}
