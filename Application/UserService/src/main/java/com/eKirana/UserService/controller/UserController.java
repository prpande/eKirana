package com.eKirana.UserService.controller;

import com.eKirana.SharedLibrary.model.user.Address;
import com.eKirana.SharedLibrary.model.user.User;
import com.eKirana.SharedLibrary.model.user.UserType;
import com.eKirana.SharedLibrary.model.user.Vehicle;
import com.eKirana.SharedLibrary.security.JwtFilter;
import com.eKirana.SharedLibrary.utilities.CommonUtils;
import com.eKirana.UserService.exception.AddressAlreadyExistsException;
import com.eKirana.UserService.exception.AddressNotFoundException;
import com.eKirana.UserService.exception.UserAlreadyExistsException;
import com.eKirana.UserService.exception.UserNotFoundException;
import com.eKirana.UserService.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static com.eKirana.SharedLibrary.RestEndpoints.*;
@RestController
@RequestMapping(USER_ROOT)
public class UserController {
    private final IUserService userService;
    private ResponseEntity<?> responseEntity;
    private final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @PostMapping(REGISTER_USER)
    public ResponseEntity<?> registerUser(@RequestBody User user) throws UserAlreadyExistsException {
        try {
            logger.info("[registerUser]: User:[{}] UserType:[{}]", user.getUserId(), user.getUserType());
            responseEntity = new ResponseEntity<>(userService.registerUser(user), HttpStatus.CREATED);
        } catch (UserAlreadyExistsException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[registerUser]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @PutMapping(UPDATE_USER)
    public ResponseEntity<?> updateUser(@RequestBody User newUserInfo, HttpServletRequest httpServletRequest) throws UserNotFoundException, UserAlreadyExistsException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            logger.info("[updateUser]: User:[{}] UserType:[{}]", userId, userType);
            responseEntity = new ResponseEntity<>(userService.updateUser(userId, newUserInfo), HttpStatus.OK);
        } catch (UserNotFoundException | UserAlreadyExistsException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[updateUser]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @GetMapping(GET_USER_BY_ID)
    public ResponseEntity<?> getUserById(HttpServletRequest httpServletRequest) throws UserNotFoundException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            logger.info("[getUserById]: User:[{}] UserType:[{}]", userId, userType);
            responseEntity = new ResponseEntity<>(userService.getUserById(userId), HttpStatus.OK);
        } catch (UserNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[getUserById]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @GetMapping(GET_ALL_USERS)
    public ResponseEntity<?> getAllUsers() {
        try {
            logger.info("[getAllUsers]: Enter");
            responseEntity = new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[getAllUsers]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @PostMapping(ADD_USER_ADDRESS)
    public ResponseEntity<?> addUserAddress(@RequestBody Address address, HttpServletRequest httpServletRequest) throws UserNotFoundException, AddressAlreadyExistsException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            logger.info("[addUserAddress]: User:[{}] UserType:[{}] Address:[{}]", userId, userType, address.getAddressId());
            responseEntity = new ResponseEntity<>(userService.addUserAddress(userId, address), HttpStatus.OK);
        } catch (UserNotFoundException | AddressAlreadyExistsException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[addUserAddress]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @PutMapping(UPDATE_USER_ADDRESS)
    public ResponseEntity<?> updateUserAddress(@RequestBody Address address, HttpServletRequest httpServletRequest) throws UserNotFoundException, AddressAlreadyExistsException, AddressNotFoundException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            logger.info("[updateUserAddress]: User:[{}] UserType:[{}] Address:[{}]", userId, userType, address.getAddressId());
            responseEntity = new ResponseEntity<>(userService.updateUserAddress(userId, address), HttpStatus.OK);
        } catch (UserNotFoundException | AddressAlreadyExistsException | AddressNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[updateUserAddress]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @DeleteMapping(DELETE_USER_ADDRESS)
    public ResponseEntity<?> deleteUserAddress(@PathVariable String addressId, HttpServletRequest httpServletRequest) throws UserNotFoundException, AddressNotFoundException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            logger.info("[deleteUserAddress]: User:[{}] UserType:[{}] Address:[{}]", userId, userType, addressId);
            responseEntity = new ResponseEntity<>(userService.deleteUserAddress(userId, addressId), HttpStatus.OK);
        } catch (UserNotFoundException | AddressNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[deleteUserAddress]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @PutMapping(SET_DELIVERY_STATUS)
    public ResponseEntity<?> setDeliveryStatus(@RequestBody boolean isDelivering, HttpServletRequest httpServletRequest) throws UserNotFoundException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            logger.info("[setDeliveryStatus]: User:[{}] UserType:[{}]", userId, userType);
            responseEntity = new ResponseEntity<>(userService.setDeliveryStatus(userId, isDelivering), HttpStatus.OK);
        } catch (UserNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[setDeliveryStatus]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }

    @PutMapping(UPDATE_VEHICLE_INFO)
    public ResponseEntity<?> updateVehicleInfo(@RequestBody Vehicle newVehicleInfo, HttpServletRequest httpServletRequest) throws UserNotFoundException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            logger.info("[updateVehicleInfo]: User:[{}] UserType:[{}] Vehicle:[{}]", userId, userType, newVehicleInfo.getRegistrationNumber());
            responseEntity = new ResponseEntity<>(userService.updateVehicleInfo(userId, newVehicleInfo), HttpStatus.OK);
        } catch (UserNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[updateVehicleInfo]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }

        return responseEntity;
    }
}
