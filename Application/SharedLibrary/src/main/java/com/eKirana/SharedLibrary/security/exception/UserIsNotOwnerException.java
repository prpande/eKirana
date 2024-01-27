package com.eKirana.SharedLibrary.security.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

public class UserIsNotOwnerException extends ResponseStatusException {
    public UserIsNotOwnerException() {
        super(HttpStatus.UNAUTHORIZED, "User is not the resource owner");
    }
}
