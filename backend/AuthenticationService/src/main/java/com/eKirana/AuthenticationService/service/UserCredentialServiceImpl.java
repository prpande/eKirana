package com.eKirana.AuthenticationService.service;

import com.eKirana.AuthenticationService.proxy.UserServiceProxy;
import com.eKirana.SharedLibrary.model.authorization.UserCredential;
import com.eKirana.SharedLibrary.model.authorization.exception.InvalidUserCredentialsException;
import com.eKirana.SharedLibrary.model.authorization.exception.UserCredentialsAlreadyExistsException;
import com.eKirana.SharedLibrary.model.authorization.exception.UserCredentialsNotFoundException;
import com.eKirana.AuthenticationService.repository.UserCredentialRepository;
import com.eKirana.SharedLibrary.model.user.User;
import com.eKirana.SharedLibrary.model.user.UserType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
@Service
public class UserCredentialServiceImpl implements IUserCredentialService{
    private UserCredentialRepository userCredentialRepository;
    private UserServiceProxy userServiceProxy;

    @Autowired
    public UserCredentialServiceImpl(UserCredentialRepository userCredentialRepository, UserServiceProxy userServiceProxy) {
        this.userCredentialRepository = userCredentialRepository;
        this.userServiceProxy = userServiceProxy;
    }

    @Override
    public String checkUserId(String userId) throws UserCredentialsAlreadyExistsException {
        if(userCredentialRepository.findById(userId).isPresent()){
            throw new UserCredentialsAlreadyExistsException();
        }

        return userId;
    }

    @Override
    public UserCredential saveUserCredential(UserCredential userCredential) throws UserCredentialsAlreadyExistsException {
        if(userCredentialRepository.findById(userCredential.getUserId()).isPresent()){
            throw new UserCredentialsAlreadyExistsException();
        }

        User newUser = new User();
        newUser.setUserId(userCredential.getUserId());
        newUser.setUserType(userCredential.getUserType());
        ResponseEntity<?> responseEntity = userServiceProxy.createUser(newUser);
        if(responseEntity.getStatusCode() != HttpStatus.CREATED){
            throw new ResponseStatusException(responseEntity.getStatusCode(), "Error from UserProxy: " + responseEntity.getBody());
        }

        return userCredentialRepository.save(userCredential);
    }

    @Override
    public UserCredential getUserCredentialByUserIdAndPasswordAndUserType(String userId, String password, UserType userType) throws InvalidUserCredentialsException {
        if(userCredentialRepository.findByUserIdAndPasswordAndUserType(userId, password, userType) == null){
            throw new InvalidUserCredentialsException();
        }

        return userCredentialRepository.findByUserIdAndPasswordAndUserType(userId, password, userType);
    }

    @Override
    public UserCredential updateUserPassword(String userId, String newPassword) throws UserCredentialsNotFoundException, UserCredentialsAlreadyExistsException {
        Optional<UserCredential> optCredentials = userCredentialRepository.findById(userId);
        if(optCredentials.isEmpty()){
            throw new UserCredentialsNotFoundException();
        }

        UserCredential foundCredentials = optCredentials.get();
        if(foundCredentials.getPassword().equals(newPassword)){
            throw new UserCredentialsAlreadyExistsException();
        }

        foundCredentials.setPassword(newPassword);
        return userCredentialRepository.save(foundCredentials);
    }
}
