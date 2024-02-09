package com.eKirana.UserService.service;

import com.eKirana.SharedLibrary.messaging.model.Alert;
import com.eKirana.SharedLibrary.model.user.Address;
import com.eKirana.SharedLibrary.model.user.User;
import com.eKirana.SharedLibrary.model.user.UserType;
import com.eKirana.SharedLibrary.model.user.Vehicle;
import com.eKirana.SharedLibrary.model.user.exception.*;
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
    public User createUser(User userInfo) throws UserAlreadyExistsException {
        if(userRepository.findById(userInfo.getUserId()).isPresent()){
            throw new UserAlreadyExistsException();
        }

        Address address = userInfo.getAddress();
        if(address == null)
        {
            address = new Address();
        }

        address.setUserId(userInfo.getUserId());
        userInfo.setAddress(address);
        return userRepository.save(userInfo);
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
            newUserInfo.getAddress().setUserId(userId);
            user.setAddress(newUserInfo.getAddress());
        }

        if(newUserInfo.getDeliveryAddresses() != null && !newUserInfo.getDeliveryAddresses().isEmpty()){
            user.setDeliveryAddresses(newUserInfo.getDeliveryAddresses());
        }

        if (newUserInfo.getPanCardNumber() != null){
            user.setPanCardNumber(newUserInfo.getPanCardNumber());
        }

        if (newUserInfo.getGstNumber() != null){
            user.setGstNumber(newUserInfo.getGstNumber());
        }

        if(newUserInfo.getVehicleInfo() != null){
            user.setVehicleInfo(newUserInfo.getVehicleInfo());
        }

        if(newUserInfo.getAlertList() != null){
            user.setAlertList(newUserInfo.getAlertList());
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
    public List<Address> getAllShops() {
        List<User> sellers = userRepository.findByUserType(UserType.SELLER);
        List<Address> shops = new ArrayList<>();
        for(User seller: sellers){
            shops.add(seller.getAddress());
        }

        return shops;
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

        address.setUserId(userId);
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
        address.setUserId(userId);
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

    @Override
    public User clearAlert(String userId, String alertId) throws UserNotFoundException, AlertNotFoundException {
        Optional<User> optUser = userRepository.findById(userId);
        if(optUser.isEmpty()){
            throw new UserNotFoundException();
        }

        User user = optUser.get();
        List<Alert> alertList = user.getAlertList();

        boolean found = false;
        for(Alert a : alertList){
            if(a.getAlertId().equals(alertId)){
                a.setCleared(true);
                found = true;
                break;
            }
        }

        if(!found){
            throw new AlertNotFoundException();
        }

        user.setAlertList(alertList);
        return userRepository.save(user);
    }
}
