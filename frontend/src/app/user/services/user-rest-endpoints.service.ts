import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRestEndpointsService {

  // Auth Service endpoints
  public static readonly AUTH_SERVICE_URL: string = "http://localhost:8081";

  public static readonly AUTHORIZATION_ROOT: string = UserRestEndpointsService.AUTH_SERVICE_URL + "/api/auth";
  public static readonly SAVE_CREDENTIALS: string = UserRestEndpointsService.AUTHORIZATION_ROOT + "/userCredential";
  public static readonly LOGIN: string = UserRestEndpointsService.AUTHORIZATION_ROOT + "/login";
  public static readonly UPDATE_PASSWORD: string = UserRestEndpointsService.AUTHORIZATION_ROOT + "/password";
  public static readonly AUTHORIZATION_SECURE_PATTERNS: string[] = [`${UserRestEndpointsService.AUTHORIZATION_ROOT}${UserRestEndpointsService.UPDATE_PASSWORD}/*`];


  // User Service endpoints
  public static readonly USER_SERVICE_URL: string = "http://localhost:8082";

  public static readonly USER_ROOT: string = UserRestEndpointsService.USER_SERVICE_URL + "/api/user";
  public static readonly UPDATE_USER: string = UserRestEndpointsService.USER_ROOT + "/info";
  public static readonly GET_USER_BY_ID: string = UserRestEndpointsService.USER_ROOT + "/info";
  public static readonly GET_ALL_USERS: string = UserRestEndpointsService.USER_ROOT + "/infos";
  public static readonly GET_ALL_SHOPS: string = UserRestEndpointsService.USER_ROOT + "/shops";
  public static readonly ADD_USER_ADDRESS: string = UserRestEndpointsService.USER_ROOT + "/info/address";
  public static readonly UPDATE_USER_ADDRESS: string = UserRestEndpointsService.USER_ROOT + "/info/address";
  public static readonly DELETE_USER_ADDRESS: string = UserRestEndpointsService.USER_ROOT + "/info/address/{addressId}";
  public static readonly SET_DELIVERY_STATUS: string = UserRestEndpointsService.USER_ROOT + "/info/deliveryStatus";
  public static readonly UPDATE_VEHICLE_INFO: string = UserRestEndpointsService.USER_ROOT + "/info/vehicle";
  public static readonly USER_SECURE_PATTERNS: string[] = [`${UserRestEndpointsService.USER_ROOT}${UserRestEndpointsService.UPDATE_USER}/*`];
  
  constructor() { }
}
