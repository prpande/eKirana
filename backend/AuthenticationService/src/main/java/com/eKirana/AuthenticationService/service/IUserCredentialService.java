package com.eKirana.AuthenticationService.service;

import com.eKirana.SharedLibrary.model.authorization.UserCredential;
import com.eKirana.SharedLibrary.model.authorization.exception.InvalidUserCredentialsException;
import com.eKirana.SharedLibrary.model.authorization.exception.UserCredentialsAlreadyExistsException;
import com.eKirana.SharedLibrary.model.authorization.exception.UserCredentialsNotFoundException;
import com.eKirana.SharedLibrary.model.user.UserType;

public interface IUserCredentialService {
    String checkUserId(String userId) throws UserCredentialsAlreadyExistsException;
    UserCredential saveUserCredential(UserCredential userCredential) throws UserCredentialsAlreadyExistsException;
    UserCredential getUserCredentialByUserIdAndPasswordAndUserType(String userId, String password, UserType userType) throws InvalidUserCredentialsException;
    UserCredential updateUserPassword(String userId, UserCredential newCredential) throws UserCredentialsNotFoundException, UserCredentialsAlreadyExistsException, InvalidUserCredentialsException;
}
