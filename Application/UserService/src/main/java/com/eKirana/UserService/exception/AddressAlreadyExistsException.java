package com.eKirana.UserService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "Address already exists")
public class AddressAlreadyExistsException extends Exception{
}
