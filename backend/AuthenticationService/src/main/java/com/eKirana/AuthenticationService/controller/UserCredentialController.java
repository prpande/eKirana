package com.eKirana.AuthenticationService.controller;

import com.eKirana.AuthenticationService.service.IUserCredentialService;
import com.eKirana.SharedLibrary.model.authorization.UserCredential;
import com.eKirana.SharedLibrary.model.authorization.exception.InvalidUserCredentialsException;
import com.eKirana.SharedLibrary.model.authorization.exception.UserCredentialsAlreadyExistsException;
import com.eKirana.SharedLibrary.model.authorization.exception.UserCredentialsNotFoundException;
import com.eKirana.SharedLibrary.security.SecurityTokenGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static com.eKirana.SharedLibrary.RestEndpoints.*;
import static com.eKirana.SharedLibrary.security.JwtFilter.getUserIdFromRequest;

@RestController
@RequestMapping(AUTHORIZATION_ROOT)
public class UserCredentialController {
    private final IUserCredentialService userCredentialService;
    private final SecurityTokenGenerator securityTokenGenerator;
    private ResponseEntity<?> responseEntity;
    private final Logger logger = LoggerFactory.getLogger(UserCredentialController.class);

    @Autowired
    public UserCredentialController(IUserCredentialService userCredentialService, SecurityTokenGenerator securityTokenGenerator) {
        this.userCredentialService = userCredentialService;
        this.securityTokenGenerator = securityTokenGenerator;
    }

    @PostMapping(SAVE_CREDENTIALS)
    public ResponseEntity<?> saveCredentials(@RequestBody UserCredential userCredential) throws UserCredentialsAlreadyExistsException {
        try {
            logger.info("[saveCredentials]: " + userCredential.getUserId());
            responseEntity = new ResponseEntity<>(userCredentialService.saveUserCredential(userCredential), HttpStatus.CREATED);
        } catch (Exception ex) {
            logger.error("[saveCredentials]: Error", ex);
            throw ex;
        }

        return responseEntity;
    }

    @PostMapping(LOGIN)
    public ResponseEntity<?> login(@RequestBody UserCredential userCredential) throws InvalidUserCredentialsException {
        try {
            logger.info("[login]: " + userCredential.getUserId());
            UserCredential foundCredentials = userCredentialService.getUserCredentialByUserIdAndPassword(userCredential.getUserId(), userCredential.getPassword());
            responseEntity = new ResponseEntity<>(securityTokenGenerator.createToken(foundCredentials), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[login]: Error", ex);
            throw ex;
        }

        return responseEntity;
    }

    @PutMapping(UPDATE_PASSWORD)
    public ResponseEntity<?> updatePassword(@RequestBody String newPassword, HttpServletRequest httpServletRequest) throws UserCredentialsAlreadyExistsException, UserCredentialsNotFoundException {
        try {
            String userId = getUserIdFromRequest(httpServletRequest);
            logger.info("[updatePassword]: " + userId);
            responseEntity = new ResponseEntity<>(userCredentialService.updateUserPassword(userId, newPassword), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[updatePassword]: Error", ex);
            throw ex;
        }

        return responseEntity;
    }
}
