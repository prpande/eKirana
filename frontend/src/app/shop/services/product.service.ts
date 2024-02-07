import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { ProductRestEndpointsService } from './product-rest-endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpCLient: HttpClient) { }

  getSellerProducts(sellerId: string): Observable<Product[]>{
    return this.httpCLient.get<Product[]>(ProductRestEndpointsService.GET_ALL_PRODUCT_BY_SELLER_ID + `/${sellerId}`);
  }

  createProduct(product: Product): Observable<Product>{
    return this.httpCLient.post<Product>(ProductRestEndpointsService.SAVE_PRODUCT, product);
  }

  updateProduct(productId: string, product: Product): Observable<Product>{
    return this.httpCLient.put<Product>(ProductRestEndpointsService.UPDATE_PRODUCT + `/${productId}`, product);
  }

  removeProduct(productId: string): Observable<boolean>{
    return this.httpCLient.delete<boolean>(ProductRestEndpointsService.REMOVE_PRODUCT + `/${productId}`);
  }
}
