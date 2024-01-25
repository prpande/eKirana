package com.eKirana.ProductService.service;

import com.eKirana.ProductService.exception.ProductAlreadyExistsException;
import com.eKirana.ProductService.exception.ProductNotFoundException;
import com.eKirana.SharedLibrary.model.product.Product;
import com.eKirana.SharedLibrary.security.exception.UserIsNotOwnerException;

import java.util.List;

public interface IProductService {
    Product saveProduct(Product product, String userId) throws ProductAlreadyExistsException;
    Product getProductById(String productId, String userId) throws ProductNotFoundException, UserIsNotOwnerException;
    List<Product> getAllProductBySellerId(String sellerId);
    List<Product> getAllProducts();
    Product updateProduct(String productId, Product product, String userId) throws ProductNotFoundException, UserIsNotOwnerException;
    Product updateProductQuantity(String productId, int newQuantity, String userId) throws ProductNotFoundException, UserIsNotOwnerException;
    boolean removeProduct(String productId, String userId) throws ProductNotFoundException, UserIsNotOwnerException;
    Product enableProduct(String productId, String userId) throws ProductNotFoundException, UserIsNotOwnerException;
    Product disableProduct(String productId, String userId) throws ProductNotFoundException, UserIsNotOwnerException;
}
