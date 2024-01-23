package com.eKirana.AuthenticationService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "Invalid User Credentials Given")
public class InvalidUserCredentialsException extends Exception{
}
