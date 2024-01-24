package com.eKirana.AuthenticationService.controller;

import com.eKirana.AuthenticationService.exception.InvalidUserCredentialsException;
import com.eKirana.AuthenticationService.exception.UserCredentialsAlreadyExistsException;
import com.eKirana.AuthenticationService.exception.UserCredentialsNotFoundException;
import com.eKirana.SharedLibrary.security.SecurityTokenGenerator;
import com.eKirana.AuthenticationService.service.IUserCredentialService;
import com.eKirana.SharedLibrary.model.authorization.UserCredential;
import com.eKirana.SharedLibrary.utilities.CommonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static com.eKirana.SharedLibrary.security.UserCredentialJWTGenerator.getUserIdFromRequest;

@RestController
@RequestMapping("/api/auth")
public class UserCredentialController {
    private IUserCredentialService userCredentialService;
    private SecurityTokenGenerator securityTokenGenerator;
    private ResponseEntity<?> responseEntity;
    private Logger logger = LoggerFactory.getLogger(UserCredentialController.class);

    @Autowired
    public UserCredentialController(IUserCredentialService userCredentialService, SecurityTokenGenerator securityTokenGenerator) {
        this.userCredentialService = userCredentialService;
        this.securityTokenGenerator = securityTokenGenerator;
    }

    @PostMapping("/saveCredentials")
    public ResponseEntity<?> saveCredentials(@RequestBody UserCredential userCredential) throws UserCredentialsAlreadyExistsException {
        try {
            responseEntity = new ResponseEntity<>(userCredentialService.saveUserCredential(userCredential), HttpStatus.CREATED);
        } catch (UserCredentialsAlreadyExistsException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("Error in saveCredentials:", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserCredential userCredential) throws InvalidUserCredentialsException {
        try {
            UserCredential foundCredentials = userCredentialService.getUserCredentialByUserIdAndPassword(userCredential.getUserId(), userCredential.getPassword());
            responseEntity = new ResponseEntity<>(securityTokenGenerator.createToken(foundCredentials), HttpStatus.OK);
        } catch (InvalidUserCredentialsException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("Error in login:", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @PutMapping("/updatePassword")
    public ResponseEntity<?> updatePassword(@RequestBody String newPassword, HttpServletRequest httpServletRequest) throws UserCredentialsAlreadyExistsException, UserCredentialsNotFoundException {
        try {
            responseEntity = new ResponseEntity<>(userCredentialService.updateUserPassword(getUserIdFromRequest(httpServletRequest), newPassword), HttpStatus.OK);
        } catch (UserCredentialsNotFoundException ex) {
            throw ex;
        } catch (UserCredentialsAlreadyExistsException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("Error in updatePassword:", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }
}
