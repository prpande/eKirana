package com.eKirana.ProductService.controller;

import com.eKirana.SharedLibrary.model.product.exception.InsufficientProductQuantityException;
import com.eKirana.SharedLibrary.model.product.exception.ProductAlreadyExistsException;
import com.eKirana.SharedLibrary.model.product.exception.ProductNotFoundException;
import com.eKirana.ProductService.service.IProductService;
import com.eKirana.SharedLibrary.model.product.Product;
import com.eKirana.SharedLibrary.security.JwtFilter;
import com.eKirana.SharedLibrary.security.exception.UserIsNotOwnerException;
import com.eKirana.SharedLibrary.utilities.CommonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static com.eKirana.SharedLibrary.RestEndpoints.*;

@RestController
@RequestMapping(PRODUCT_ROOT)
public class ProductController {
    private final IProductService productService;
    private ResponseEntity<?> responseEntity;
    private final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @Autowired
    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    @PostMapping(SAVE_PRODUCT)
    public ResponseEntity<?> saveProduct(@RequestBody Product product, HttpServletRequest request) throws ProductAlreadyExistsException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(request);
            logger.info("[saveProduct]: User:[{}] Product:[{}]", userId, product.getProductId());
            responseEntity = new ResponseEntity<>(productService.saveProduct(product, userId), HttpStatus.CREATED);
        } catch (ProductAlreadyExistsException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[saveProduct]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @GetMapping(GET_PRODUCT_BY_ID)
    public ResponseEntity<?> getProductById(@PathVariable String productId, HttpServletRequest request) throws ProductNotFoundException, UserIsNotOwnerException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(request);
            logger.info("[getProductById]: User:[{}] Product:[{}]", userId, productId);
            responseEntity = new ResponseEntity<>(productService.getProductById(productId, userId), HttpStatus.OK);
        } catch (ProductNotFoundException | UserIsNotOwnerException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[getProductById]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @GetMapping(GET_ALL_PRODUCT_BY_SELLER_ID)
    public ResponseEntity<?> getAllProductBySellerId(HttpServletRequest request) {
        try {
            String userId = JwtFilter.getUserIdFromRequest(request);
            logger.info("[getAllProductBySellerId]: User:[{}]" + userId);
            responseEntity = new ResponseEntity<>(productService.getAllProductBySellerId(userId), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[getAllProductBySellerId]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @GetMapping(GET_ALL_PRODUCTS)
    public ResponseEntity<?> getAllProducts() {
        try {
            logger.info("[getAllProducts]: Enter");
            responseEntity = new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[getAllProducts]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @PutMapping(UPDATE_PRODUCT)
    public ResponseEntity<?> updateProduct(@PathVariable String productId, @RequestBody Product product, HttpServletRequest request) throws ProductNotFoundException, UserIsNotOwnerException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(request);
            logger.info("[updateProduct]: User:[{}] Product:[{}]", userId, productId);
            responseEntity = new ResponseEntity<>(productService.updateProduct(productId, product, userId), HttpStatus.OK);
        } catch (ProductNotFoundException | UserIsNotOwnerException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[updateProduct]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @PutMapping(UPDATE_PRODUCT_QUANTITY)
    public ResponseEntity<?> updateProductQuantity(@PathVariable String productId, @RequestBody int newQuantity, HttpServletRequest request) throws ProductNotFoundException, UserIsNotOwnerException, InsufficientProductQuantityException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(request);
            logger.info("[updateProductQuantity]: User:[{}] Product:[{}]", userId, productId);
            responseEntity = new ResponseEntity<>(productService.updateProductQuantity(productId, newQuantity, userId), HttpStatus.OK);
        } catch (ProductNotFoundException | UserIsNotOwnerException | InsufficientProductQuantityException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[updateProductQuantity]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @DeleteMapping(REMOVE_PRODUCT)
    public ResponseEntity<?> removeProduct(@PathVariable String productId, HttpServletRequest request) throws ProductNotFoundException, UserIsNotOwnerException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(request);
            logger.info("[removeProduct]: User:[{}] Product:[{}]", userId, productId);
            responseEntity = new ResponseEntity<>(productService.removeProduct(productId, userId), HttpStatus.OK);
        } catch (ProductNotFoundException | UserIsNotOwnerException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[removeProduct]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @PutMapping(ENABLE_PRODUCT)
    public ResponseEntity<?> enableProduct(@PathVariable String productId, HttpServletRequest request) throws ProductNotFoundException, UserIsNotOwnerException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(request);
            logger.info("[enableProduct]: User:[{}] Product:[{}]", userId, productId);
            responseEntity = new ResponseEntity<>(productService.enableProduct(productId, userId), HttpStatus.OK);
        } catch (ProductNotFoundException | UserIsNotOwnerException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[enableProduct]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @PutMapping(DISABLE_PRODUCT)
    public ResponseEntity<?> disableProduct(@PathVariable String productId, HttpServletRequest request) throws ProductNotFoundException, UserIsNotOwnerException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(request);
            logger.info("[disableProduct]: User:[{}] Product:[{}]", userId, productId);
            responseEntity = new ResponseEntity<>(productService.disableProduct(productId, userId), HttpStatus.OK);
        } catch (ProductNotFoundException | UserIsNotOwnerException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[disableProduct]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }
}
