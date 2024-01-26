package com.eKirana.SharedLibrary.model.user.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Address not found")
public class AddressNotFoundException extends Exception{
}
