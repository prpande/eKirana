package com.eKirana.SharedLibrary.model.image.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class ImageNotFoundException extends ResponseStatusException {
    public ImageNotFoundException() {
        super(HttpStatus.NOT_FOUND, "Image not Found");
    }
}
