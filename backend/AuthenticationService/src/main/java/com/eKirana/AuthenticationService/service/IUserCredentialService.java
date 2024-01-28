package com.eKirana.AuthenticationService.service;

import com.eKirana.SharedLibrary.model.authorization.UserCredential;
import com.eKirana.SharedLibrary.model.authorization.exception.InvalidUserCredentialsException;
import com.eKirana.SharedLibrary.model.authorization.exception.UserCredentialsAlreadyExistsException;
import com.eKirana.SharedLibrary.model.authorization.exception.UserCredentialsNotFoundException;

public interface IUserCredentialService {
    UserCredential saveUserCredential(UserCredential userCredential) throws UserCredentialsAlreadyExistsException;
    UserCredential getUserCredentialByUserIdAndPassword(String userId, String password) throws InvalidUserCredentialsException;
    UserCredential updateUserPassword(String userId, String newPassword) throws UserCredentialsNotFoundException, UserCredentialsAlreadyExistsException;
}
