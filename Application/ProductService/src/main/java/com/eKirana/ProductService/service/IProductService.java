package com.eKirana.ProductService.service;

import com.eKirana.ProductService.exception.ProductAlreadyExistsException;
import com.eKirana.ProductService.exception.ProductNotFoundException;
import com.eKirana.SharedLibrary.model.product.Product;

import java.util.List;

public interface IProductService {
    Product saveProduct(Product product) throws ProductAlreadyExistsException;
    Product getProductById(String productId) throws ProductNotFoundException;
    List<Product> getAllProductBySellerId(String sellerId);
    List<Product> getAllProducts();
    Product updateProduct(Product product) throws ProductNotFoundException;
    Product updateProductQuantity(String productId, int newQuantity) throws ProductNotFoundException;
    boolean removeProduct(String productId) throws ProductNotFoundException;
}
