package com.eKirana.SharedLibrary.security.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.UNAUTHORIZED, reason = "User is not the resource owner")
public class UserIsNotOwnerException extends Exception{
}
