package com.eKirana.UserService.service;

import com.eKirana.SharedLibrary.model.user.User;
import com.eKirana.UserService.exception.UserAlreadyExistsException;
import com.eKirana.UserService.exception.UserNotFoundException;
import com.eKirana.UserService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements IUserService{
    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user) throws UserAlreadyExistsException {
        Optional<User> optUser = userRepository.findById(user.getUserId());
        if(optUser.isPresent()){
            throw new UserAlreadyExistsException();
        }

        return userRepository.save(user);
    }

    @Override
    public User updateUser(String userId, User newUserInfo) throws UserNotFoundException, UserAlreadyExistsException {
        Optional<User> optUser = userRepository.findById(userId);
        if(optUser.isEmpty()){
            throw new UserNotFoundException();
        }

        User user = optUser.get();

        if(newUserInfo.getFirstName() != null){
            user.setFirstName(newUserInfo.getFirstName());
        }

        if(newUserInfo.getLastName() != null){
            user.setLastName(newUserInfo.getLastName());
        }

        if(newUserInfo.getEmail() != null){
            user.setEmail(newUserInfo.getEmail());
        }

        if (newUserInfo.getPhoneNumber() != null){
            user.setPhoneNumber(newUserInfo.getPhoneNumber());
        }

        if(newUserInfo.getDateOfBirth() != null){
            user.setDateOfBirth(newUserInfo.getDateOfBirth());
        }

        if(newUserInfo.getAddress() != null){
            user.setAddress(newUserInfo.getAddress());
        }

        if(newUserInfo.getDeliveryAddresses() != null && !newUserInfo.getDeliveryAddresses().isEmpty()){
            user.setDeliveryAddresses(newUserInfo.getDeliveryAddresses());
        }

        if (newUserInfo.getPanCardNumber() != null){
            user.setPanCardNumber(newUserInfo.getPanCardNumber());
        }

        if (newUserInfo.getGstIdNumber() != null){
            user.setGstIdNumber(newUserInfo.getGstIdNumber());
        }

        if(newUserInfo.getVehicleInfo() != null){
            user.setVehicleInfo(newUserInfo.getVehicleInfo());
        }

        return userRepository.save(user);
    }

    @Override
    public User getUserById(String userId) throws UserNotFoundException {
        Optional<User> optUser = userRepository.findById(userId);
        if(optUser.isEmpty()){
            throw new UserNotFoundException();
        }

        return optUser.get();
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User setDeliveryStatus(String userId, boolean isDelivering) throws UserNotFoundException {
        Optional<User> optUser = userRepository.findById(userId);
        if(optUser.isEmpty()){
            throw new UserNotFoundException();
        }

        User user = optUser.get();
        user.getVehicleInfo().setDelivering(isDelivering);
        return userRepository.save(user);
    }
}
