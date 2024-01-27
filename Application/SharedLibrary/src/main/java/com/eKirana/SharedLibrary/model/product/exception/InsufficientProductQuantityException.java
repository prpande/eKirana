package com.eKirana.SharedLibrary.model.product.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InsufficientProductQuantityException extends ResponseStatusException {
    public InsufficientProductQuantityException() {
        super(HttpStatus.NOT_FOUND, "Insufficient product quantity");
    }
}
