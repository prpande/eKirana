import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderRestEndpointsService {

  // Order Service endpoints
  public static readonly ORDER_SERVICE_URL: string = "http://localhost:8084";

  public static readonly ORDER_ROOT: string = OrderRestEndpointsService.ORDER_SERVICE_URL + "/api/order";
  public static readonly PLACE_ORDER: string = OrderRestEndpointsService.ORDER_ROOT + "/";
  public static readonly GET_ALL_ORDERS: string = OrderRestEndpointsService.ORDER_ROOT + "/orders";
  public static readonly GET_ORDERS_AVAILABLE_FOR_DELIVERY: string = OrderRestEndpointsService.ORDER_ROOT + "/delivery";
  public static readonly ORDER_SECURE_PATTERNS: string[] = [OrderRestEndpointsService.ORDER_ROOT + "/*"];

  static GET_ALL_ORDERS_BY_USER_ID(userId: string): string{
    return `${OrderRestEndpointsService.ORDER_ROOT}/user/${userId}`
  }

  static GET_ORDER_BY_ID(orderId: string): string{
    return `${OrderRestEndpointsService.ORDER_ROOT}/${orderId}`
  }

  static CANCEL_ORDER(orderId: string): string{
    return `${OrderRestEndpointsService.ORDER_ROOT}/${orderId}`
  }

  static UPDATE_ORDER_STATUS(orderId: string): string{
    return `${OrderRestEndpointsService.ORDER_ROOT}/${orderId}/status`
  }

  static UPDATE_ORDER_CARRIER(orderId: string): string{
    return `${OrderRestEndpointsService.ORDER_ROOT}/${orderId}/carrier`
  }

  static UPDATE_ORDER_COMMENTS(orderId: string): string{
    return `${OrderRestEndpointsService.ORDER_ROOT}/${orderId}/comments`
  }

  static UPDATE_ORDER_DELIVERY_DATE(orderId: string): string{
    return `${OrderRestEndpointsService.ORDER_ROOT}/${orderId}/deliveryDate`
  }
}
