import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductRestEndpointsService {

  // Auth Service endpoints
  public static readonly PRODUCT_SERVICE_URL: string = "http://localhost:8083";

  public static readonly PRODUCT_ROOT: string = ProductRestEndpointsService.PRODUCT_SERVICE_URL + "/api/product";
  public static readonly SAVE_PRODUCT: string = ProductRestEndpointsService.PRODUCT_ROOT + "/";
  public static readonly GET_PRODUCT_BY_ID: string = ProductRestEndpointsService.PRODUCT_ROOT + "/{productId}";
  public static readonly GET_ALL_PRODUCT_BY_SELLER_ID: string = ProductRestEndpointsService.PRODUCT_ROOT + "/seller";
  public static readonly GET_ALL_PRODUCTS: string = ProductRestEndpointsService.PRODUCT_ROOT + "/products";
  public static readonly UPDATE_PRODUCT: string = ProductRestEndpointsService.PRODUCT_ROOT + "/{productId}";
  public static readonly UPDATE_PRODUCT_QUANTITY: string = ProductRestEndpointsService.PRODUCT_ROOT + "/{productId}/quantity";
  public static readonly REMOVE_PRODUCT: string = ProductRestEndpointsService.PRODUCT_ROOT + "/{productId}";
  public static readonly ENABLE_PRODUCT: string = ProductRestEndpointsService.PRODUCT_ROOT + "/{productId}/enable";
  public static readonly DISABLE_PRODUCT: string = ProductRestEndpointsService.PRODUCT_ROOT + "/{productId}/disable";
  public static readonly PRODUCT_SECURE_PATTERNS: string[] = [ProductRestEndpointsService.PRODUCT_ROOT + "/*"];

  constructor() { }
}
