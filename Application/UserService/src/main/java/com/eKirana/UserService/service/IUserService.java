package com.eKirana.UserService.service;

import com.eKirana.SharedLibrary.model.user.Address;
import com.eKirana.SharedLibrary.model.user.User;
import com.eKirana.SharedLibrary.model.user.Vehicle;
import com.eKirana.SharedLibrary.model.user.exception.*;
import com.eKirana.SharedLibrary.security.exception.UserIsNotOwnerException;

import java.util.List;

public interface IUserService {
    User updateUser(String userId, User newUserInfo) throws UserNotFoundException, UserAlreadyExistsException;

    User getUserById(String userId) throws UserNotFoundException;

    List<User> getAllUsers();

    User addUserAddress(String userId, Address address) throws UserNotFoundException, AddressAlreadyExistsException;

    User updateUserAddress(String userId, Address address) throws UserNotFoundException, AddressAlreadyExistsException, AddressNotFoundException;

    User deleteUserAddress(String userId, String addressId) throws UserNotFoundException, AddressNotFoundException;

    User setDeliveryStatus(String userId, boolean isDelivering) throws UserNotFoundException;

    User updateVehicleInfo(String userId, Vehicle newVehicleInfo) throws UserNotFoundException;
    User clearAlert(String userId, String alertId) throws UserNotFoundException, AlertNotFoundException;
}