package com.eKirana.SharedLibrary.model.authorization.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserCredentialsNotFoundException extends ResponseStatusException {
    public UserCredentialsNotFoundException() {
        super(HttpStatus.NOT_FOUND, "User Credentials not Found");
    }
}
