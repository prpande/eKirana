package com.eKirana.SharedLibrary.model.authorization.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidUserCredentialsException extends ResponseStatusException {
    public InvalidUserCredentialsException() {
        super(HttpStatus.UNAUTHORIZED, "Invalid User Credentials Given");
    }
}
