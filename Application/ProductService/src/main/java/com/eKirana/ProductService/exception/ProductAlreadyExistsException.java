package com.eKirana.ProductService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Product already exists")
public class ProductAlreadyExistsException extends Exception{
}
