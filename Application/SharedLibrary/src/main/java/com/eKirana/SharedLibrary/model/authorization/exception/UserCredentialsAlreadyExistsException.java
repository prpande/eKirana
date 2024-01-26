package com.eKirana.SharedLibrary.model.authorization.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT, reason = "User Already Present")
public class UserCredentialsAlreadyExistsException extends Exception{
}