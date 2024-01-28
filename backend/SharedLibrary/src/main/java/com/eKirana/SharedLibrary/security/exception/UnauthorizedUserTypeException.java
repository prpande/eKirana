package com.eKirana.SharedLibrary.security.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UnauthorizedUserTypeException extends ResponseStatusException {
    public UnauthorizedUserTypeException() {
        super(HttpStatus.UNAUTHORIZED, "UserType not authorized to perform this action");
    }
}
