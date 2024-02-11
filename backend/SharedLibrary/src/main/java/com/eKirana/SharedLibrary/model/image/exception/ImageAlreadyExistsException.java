package com.eKirana.SharedLibrary.model.image.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ImageAlreadyExistsException extends ResponseStatusException {
    public ImageAlreadyExistsException() {
        super(HttpStatus.CONFLICT, "Image already exists");
    }
}
