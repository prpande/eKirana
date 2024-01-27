package com.eKirana.SharedLibrary.model.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class OrderNotConfirmedException extends ResponseStatusException {
    public OrderNotConfirmedException() {
        super(HttpStatus.FORBIDDEN, "Order status not confirmed");
    }
}
