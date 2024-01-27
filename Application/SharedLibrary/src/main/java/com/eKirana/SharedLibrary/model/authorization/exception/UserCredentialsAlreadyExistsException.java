package com.eKirana.SharedLibrary.model.authorization.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserCredentialsAlreadyExistsException extends ResponseStatusException {
    public UserCredentialsAlreadyExistsException() {
        super(HttpStatus.CONFLICT, "User Already Present");
    }
}
