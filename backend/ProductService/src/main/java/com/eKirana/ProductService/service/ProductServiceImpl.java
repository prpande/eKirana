package com.eKirana.ProductService.service;

import com.eKirana.SharedLibrary.model.product.exception.InsufficientProductQuantityException;
import com.eKirana.SharedLibrary.model.product.exception.ProductAlreadyExistsException;
import com.eKirana.SharedLibrary.model.product.exception.ProductNotFoundException;
import com.eKirana.ProductService.repository.ProductRepository;
import com.eKirana.SharedLibrary.model.product.Product;
import com.eKirana.SharedLibrary.security.exception.UserIsNotOwnerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.eKirana.SharedLibrary.security.Constants.SYSTEM_USER_ID;

@Service
public class ProductServiceImpl implements IProductService{
    private ProductRepository productRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product saveProduct(Product product, String userId) throws ProductAlreadyExistsException {
        if(productRepository.findById(product.getProductId()).isPresent()){
            throw new ProductAlreadyExistsException();
        }

        product.setSellerId(userId);
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
    public Product updateProduct(String productId, Product newProduct, String userId) throws ProductNotFoundException, UserIsNotOwnerException {
        Optional<Product> optProduct = productRepository.findById(productId);
        if (optProduct.isEmpty()) {
            throw new ProductNotFoundException();
        }

        Product product = optProduct.get();

        if (!product.getSellerId().equals(userId) && !userId.equals(SYSTEM_USER_ID)) {
            throw new UserIsNotOwnerException();
        }

        if (newProduct.getName() != null) {
            product.setName(newProduct.getName());
        }

        if (newProduct.getPrice() > 0) {
            product.setPrice(newProduct.getPrice());
        }

        if (newProduct.getSpecifications() != null) {
            product.setSpecifications(newProduct.getSpecifications());
        }

        if (newProduct.getDescription() != null) {
            product.setDescription(newProduct.getDescription());
        }

        if(newProduct.getQuantity() >= 0){
            product.setQuantity(newProduct.getQuantity());
        }

        if (newProduct.getCategory() != null) {
            product.setCategory(newProduct.getCategory());
        }

        if (newProduct.getImageUrl() != null && !newProduct.getImageUrl().isEmpty()) {
            product.setImageUrl(newProduct.getImageUrl());
        }

        return productRepository.save(product);

    }

    @Override
    public Product updateProductQuantity(String productId, int newQuantity, String userId) throws ProductNotFoundException, UserIsNotOwnerException, InsufficientProductQuantityException {
        Optional<Product> optProduct = productRepository.findById(productId);
        if(optProduct.isEmpty()){
            throw new ProductNotFoundException();
        }

        Product product = optProduct.get();
        if(!product.getSellerId().equals(userId) && !userId.equals(SYSTEM_USER_ID) ){
            throw new UserIsNotOwnerException();
        }

        if(product.getQuantity() + newQuantity < 0){
            throw new InsufficientProductQuantityException();
        }
        product.setQuantity(product.getQuantity() + newQuantity);

        if(product.getQuantity() < 1)
        {
            product.setQuantity(0);
            product.setAvailable(false);
        }
        return productRepository.save(product);
    }

    @Override
    public boolean removeProduct(String productId, String userId) throws ProductNotFoundException, UserIsNotOwnerException {
        Optional<Product> optProduct = productRepository.findById(productId);
        if(optProduct.isEmpty()){
            throw new ProductNotFoundException();
        }

        Product product = optProduct.get();
        if(!product.getSellerId().equals(userId) && !userId.equals(SYSTEM_USER_ID) ){
            throw new UserIsNotOwnerException();
        }

        productRepository.deleteById(productId);
        return true;
    }

    @Override
    public Product enableProduct(String productId, String userId) throws ProductNotFoundException, UserIsNotOwnerException {
        Optional<Product> optProduct = productRepository.findById(productId);
        if(optProduct.isEmpty()){
            throw new ProductNotFoundException();
        }

        Product product = optProduct.get();
        if(!product.getSellerId().equals(userId) && !userId.equals(SYSTEM_USER_ID) ){
            throw new UserIsNotOwnerException();
        }

        product.setAvailable(true);
        return productRepository.save(product);
    }

    @Override
    public Product disableProduct(String productId, String userId) throws ProductNotFoundException, UserIsNotOwnerException {
        Optional<Product> optProduct = productRepository.findById(productId);
        if(optProduct.isEmpty()){
            throw new ProductNotFoundException();
        }

        Product product = optProduct.get();
        if(!product.getSellerId().equals(userId) && !userId.equals(SYSTEM_USER_ID) ){
            throw new UserIsNotOwnerException();
        }

        product.setAvailable(false);
        return productRepository.save(product);
    }
}
