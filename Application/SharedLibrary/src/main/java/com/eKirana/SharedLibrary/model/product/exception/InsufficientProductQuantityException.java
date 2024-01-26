package com.eKirana.SharedLibrary.model.product.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Insufficient product quantity")
public class InsufficientProductQuantityException extends Exception{
}
