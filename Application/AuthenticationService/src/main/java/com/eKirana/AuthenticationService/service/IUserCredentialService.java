package com.eKirana.AuthenticationService.service;

import com.eKirana.SharedLibrary.model.authorization.UserCredential;
import com.eKirana.AuthenticationService.exception.InvalidUserCredentialsException;
import com.eKirana.AuthenticationService.exception.UserCredentialsAlreadyExistsException;
import com.eKirana.AuthenticationService.exception.UserCredentialsNotFoundException;

public interface IUserCredentialService {
    UserCredential saveUserCredential(UserCredential userCredential) throws UserCredentialsAlreadyExistsException;
    UserCredential getUserCredentialByUserIdAndPassword(String userId, String password) throws InvalidUserCredentialsException;
    UserCredential updateUserPassword(String userId, String newPassword) throws UserCredentialsNotFoundException, UserCredentialsAlreadyExistsException;
}
