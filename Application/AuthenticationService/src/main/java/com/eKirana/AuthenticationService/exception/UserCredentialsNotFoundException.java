package com.eKirana.AuthenticationService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "User Credentials not Found")
public class UserCredentialsNotFoundException extends Exception{
}
