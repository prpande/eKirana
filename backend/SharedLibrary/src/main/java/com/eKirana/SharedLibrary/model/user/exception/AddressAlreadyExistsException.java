package com.eKirana.SharedLibrary.model.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class AddressAlreadyExistsException extends ResponseStatusException {
    public AddressAlreadyExistsException() {
        super(HttpStatus.CONFLICT, "Address already exists");
    }
}
