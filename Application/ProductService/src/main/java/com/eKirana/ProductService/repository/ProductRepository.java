package com.eKirana.ProductService.repository;

import com.eKirana.SharedLibrary.model.product.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {
}
