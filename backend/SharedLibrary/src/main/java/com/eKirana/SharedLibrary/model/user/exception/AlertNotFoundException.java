package com.eKirana.SharedLibrary.model.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class AlertNotFoundException extends ResponseStatusException {
    public AlertNotFoundException() {
        super(HttpStatus.NOT_FOUND, "Alert not found");
    }
}
