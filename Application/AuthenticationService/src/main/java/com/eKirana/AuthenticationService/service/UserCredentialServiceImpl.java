package com.eKirana.AuthenticationService.service;

import com.eKirana.SharedLibrary.model.authorization.UserCredential;
import com.eKirana.AuthenticationService.exception.InvalidUserCredentialsException;
import com.eKirana.AuthenticationService.exception.UserCredentialsAlreadyExistsException;
import com.eKirana.AuthenticationService.exception.UserCredentialsNotFoundException;
import com.eKirana.AuthenticationService.repository.UserCredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserCredentialServiceImpl implements IUserCredentialService{
    private UserCredentialRepository userCredentialRepository;

    @Autowired
    public UserCredentialServiceImpl(UserCredentialRepository userCredentialRepository) {
        this.userCredentialRepository = userCredentialRepository;
    }

    @Override
    public UserCredential saveUserCredential(UserCredential userCredential) throws UserCredentialsAlreadyExistsException {
        if(userCredentialRepository.findById(userCredential.getUserId()).isPresent()){
            throw new UserCredentialsAlreadyExistsException();
        }

        return userCredentialRepository.save(userCredential);
    }

    @Override
    public UserCredential getUserCredentialByUserIdAndPassword(String userId, String password) throws InvalidUserCredentialsException {
        if(userCredentialRepository.findByUserIdAndPassword(userId, password) == null){
            throw new InvalidUserCredentialsException();
        }

        return userCredentialRepository.findByUserIdAndPassword(userId, password);
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
