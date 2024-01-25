package com.eKirana.UserService.service;

import com.eKirana.SharedLibrary.model.user.Address;
import com.eKirana.SharedLibrary.model.user.User;
import com.eKirana.SharedLibrary.model.user.Vehicle;
import com.eKirana.UserService.exception.AddressAlreadyExistsException;
import com.eKirana.UserService.exception.AddressNotFoundException;
import com.eKirana.UserService.exception.UserAlreadyExistsException;
import com.eKirana.UserService.exception.UserNotFoundException;
import com.eKirana.UserService.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public User addUserAddress(String userId, Address address) throws UserNotFoundException, AddressAlreadyExistsException {
        Optional<User> optUser = userRepository.findById(userId);
        if(optUser.isEmpty()){
            throw new UserNotFoundException();
        }

        User user = optUser.get();
        List<Address> addressList = user.getDeliveryAddresses();

        if(addressList == null){
            addressList = new ArrayList<>();
        } else {
            for(Address a: addressList){
                if(a.getAddressId().equals(address.getAddressId()) || a.equals(address)){
                    throw new AddressAlreadyExistsException();
                }
            }
        }

        addressList.add(address);
        user.setDeliveryAddresses(addressList);
        return userRepository.save(user);
    }

    @Override
    public User updateUserAddress(String userId, Address address) throws UserNotFoundException, AddressAlreadyExistsException, AddressNotFoundException {
        Optional<User> optUser = userRepository.findById(userId);
        if(optUser.isEmpty()){
            throw new UserNotFoundException();
        }

        User user = optUser.get();
        List<Address> addressList = user.getDeliveryAddresses();

        if(addressList == null){
            throw new AddressNotFoundException();
        }

        Address foundAddress = null;
        for(Address a : addressList){
            if(a.getAddressId().equals(address.getAddressId()) || a.equals(address)){
                foundAddress = a;
                break;
            }
        }

        if(foundAddress == null){
            throw new AddressNotFoundException();
        }

        if(foundAddress.equals(address)){
            throw new AddressAlreadyExistsException();
        }

        addressList.remove(foundAddress);
        addressList.add(address);
        user.setDeliveryAddresses(addressList);

        return userRepository.save(user);
    }

    @Override
    public User deleteUserAddress(String userId, String addressId) throws UserNotFoundException, AddressNotFoundException {
        Optional<User> optUser = userRepository.findById(userId);
        if(optUser.isEmpty()){
            throw new UserNotFoundException();
        }

        User user = optUser.get();
        List<Address> addressList = user.getDeliveryAddresses();

        if(addressList == null){
            throw new AddressNotFoundException();
        }

        Address foundAddress = null;
        for(Address a : addressList){
            if(a.getAddressId().equals(addressId)){
                foundAddress = a;
                break;
            }
        }

        if(foundAddress == null){
            throw new AddressNotFoundException();
        }

        addressList.remove(foundAddress);
        user.setDeliveryAddresses(addressList);

        return userRepository.save(user);
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

    @Override
    public User updateVehicleInfo(String userId, Vehicle newVehicleInfo) throws UserNotFoundException {
        Optional<User> optUser = userRepository.findById(userId);
        if(optUser.isEmpty()){
            throw new UserNotFoundException();
        }

        User user = optUser.get();
        Vehicle vehicleInfo = user.getVehicleInfo();
        
        if(vehicleInfo == null){
            vehicleInfo = new Vehicle();
        }

        if(newVehicleInfo.getDrivingLicenseNumber() != null){
            vehicleInfo.setDrivingLicenseNumber(newVehicleInfo.getDrivingLicenseNumber());
        }

        if(newVehicleInfo.getRegistrationNumber() != null){
            vehicleInfo.setRegistrationNumber(newVehicleInfo.getRegistrationNumber());
        }

        if(newVehicleInfo.getMake() != null){
            vehicleInfo.setMake(newVehicleInfo.getMake());
        }

        if(newVehicleInfo.getModel() != null){
            vehicleInfo.setModel(newVehicleInfo.getModel());
        }

        if(newVehicleInfo.getVehicleType() != null){
            vehicleInfo.setVehicleType(newVehicleInfo.getVehicleType());
        }

        if(newVehicleInfo.getCapacity() != null){
            vehicleInfo.setCapacity(newVehicleInfo.getCapacity());
        }

        if(newVehicleInfo.getLatitude() != 0){
            vehicleInfo.setLatitude(newVehicleInfo.getLatitude());
        }

        if(newVehicleInfo.getLongitude() != 0){
            vehicleInfo.setLongitude(newVehicleInfo.getLongitude());
        }

        user.setVehicleInfo(vehicleInfo);
        return userRepository.save(user);
    }
}
