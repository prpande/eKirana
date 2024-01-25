package com.eKirana.SharedLibrary.security.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED, reason = "UserType not authorized to perform this action")
public class UnauthorizedUserTypeException extends Exception{
}
