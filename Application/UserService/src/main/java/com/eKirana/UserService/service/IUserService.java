package com.eKirana.UserService.service;

import com.eKirana.SharedLibrary.model.user.User;
import com.eKirana.UserService.exception.UserAlreadyExistsException;
import com.eKirana.UserService.exception.UserNotFoundException;

import java.util.List;

public interface IUserService {
    User registerUser(User user) throws UserAlreadyExistsException;
    User updateUser(User newUserInfo) throws UserNotFoundException, UserAlreadyExistsException;
    User getUserById(String userId) throws UserNotFoundException;
    List<User> getAllUsers();
}
