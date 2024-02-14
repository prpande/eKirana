import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageService } from 'src/app/shared/image-manager/services/image.service';
import { Product } from '../models/product';
import { ProductRestEndpointsService } from './product-rest-endpoints.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpCLient: HttpClient, private imageService: ImageService) { }

  getSellerProducts(sellerId: string): Observable<Product[]> {
    return this.httpCLient.get<Product[]>(ProductRestEndpointsService.GET_ALL_PRODUCT_BY_SELLER_ID + `/${sellerId}`);
  }

  createProduct(product: Product): Observable<Product> {
    this.saveProductImage(product);
    return this.httpCLient.post<Product>(ProductRestEndpointsService.SAVE_PRODUCT, product);
  }

  updateProduct(productId: string, product: Product): Observable<Product> {
    this.saveProductImage(product);
    return this.httpCLient.put<Product>(ProductRestEndpointsService.UPDATE_PRODUCT + `/${productId}`, product);
  }

  removeProduct(productId: string): Observable<boolean> {
    return this.httpCLient.delete<boolean>(ProductRestEndpointsService.REMOVE_PRODUCT + `/${productId}`);
  }

  saveProductImage(product: Product) {
    if (product.imageUrl) {
      this.imageService.saveCachedImage(product.imageUrl);
    }
  }

  getAllProducts() : Observable<Product[]>{
    return this.httpCLient.get<Product[]>(ProductRestEndpointsService.GET_ALL_PRODUCTS);
  }
}
