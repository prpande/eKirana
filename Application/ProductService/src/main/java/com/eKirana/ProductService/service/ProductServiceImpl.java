package com.eKirana.ProductService.service;

import com.eKirana.ProductService.exception.ProductAlreadyExistsException;
import com.eKirana.ProductService.exception.ProductNotFoundException;
import com.eKirana.ProductService.repository.ProductRepository;
import com.eKirana.SharedLibrary.model.product.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService{
    private ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product saveProduct(Product product) throws ProductAlreadyExistsException {
        if(productRepository.findById(product.getProductId()).isPresent()){
            throw new ProductAlreadyExistsException();
        }

        return productRepository.save(product);
    }

    @Override
    public Product getProductById(String productId) throws ProductNotFoundException {
        Optional<Product> optProduct = productRepository.findById(productId);
        if(optProduct.isEmpty()){
            throw new ProductNotFoundException();
        }

        return optProduct.get();
    }

    @Override
    public List<Product> getAllProductBySellerId(String sellerId) {
        return productRepository.findBySellerId(sellerId);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product updateProduct(String productId, Product newProduct) throws ProductNotFoundException {
        Optional<Product> optProduct = productRepository.findById(productId);
        if(optProduct.isEmpty()){
            throw new ProductNotFoundException();
        }

        Product product = optProduct.get();

        if(newProduct.getName() != null){
            product.setName(newProduct.getName());
        }

        if(newProduct.getPrice() > 0){
            product.setPrice(newProduct.getPrice());
        }

        if(newProduct.getSpecifications() != null){
            product.setSpecifications(newProduct.getSpecifications());
        }

        if(newProduct.getDescription() != null){
            product.setDescription(newProduct.getDescription());
        }

        if(newProduct.getCategory() != null){
            product.setCategory(newProduct.getCategory());
        }

        if (newProduct.getImageUrl() != null && !newProduct.getImageUrl().isEmpty()){
            product.setImageUrl(newProduct.getImageUrl());
        }

        return productRepository.save(product);
    }

    @Override
    public Product updateProductQuantity(String productId, int newQuantity) throws ProductNotFoundException {
        Optional<Product> optProduct = productRepository.findById(productId);
        if(optProduct.isEmpty()){
            throw new ProductNotFoundException();
        }

        Product product = optProduct.get();
        product.setQuantity(product.getQuantity() + newQuantity);

        if(product.getQuantity() < 1)
        {
            product.setQuantity(0);
            product.setAvailable(false);
        }
        return productRepository.save(product);
    }

    @Override
    public boolean removeProduct(String productId) throws ProductNotFoundException {
        Optional<Product> optProduct = productRepository.findById(productId);
        if(optProduct.isEmpty()){
            throw new ProductNotFoundException();
        }

        productRepository.deleteById(productId);
        return true;
    }

    @Override
    public Product enableProduct(String productId) throws ProductNotFoundException {
        Optional<Product> optProduct = productRepository.findById(productId);
        if(optProduct.isEmpty()){
            throw new ProductNotFoundException();
        }

        Product product = optProduct.get();
        product.setAvailable(true);
        return productRepository.save(product);
    }

    @Override
    public Product disableProduct(String productId) throws ProductNotFoundException {
        Optional<Product> optProduct = productRepository.findById(productId);
        if(optProduct.isEmpty()){
            throw new ProductNotFoundException();
        }

        Product product = optProduct.get();
        product.setAvailable(false);
        return productRepository.save(product);
    }
}
