package com.eKirana.SharedLibrary.model.user;

import com.eKirana.SharedLibrary.messaging.model.Alert;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;

@Document
public class User {
    @Id
    private String userId;

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String dateOfBirth;

    private UserType userType;

    private Address address; // mailing address for customer and carrier , shop address for seller
    private List<Address> deliveryAddresses; // list of delivery addresses for customer

    private String panCardNumber; // PAN card # for seller and carrier
    private String gstNumber; // GST IN for seller

    private Vehicle vehicleInfo; // details of carrier vehicle

    private List<Alert> alertList;

    public User() {
    }

    public User(String userId, String firstName, String lastName, String email, String phoneNumber, String dateOfBirth, UserType userType, Address address, List<Address> deliveryAddresses, String panCardNumber, String gstNumber, Vehicle vehicleInfo, List<Alert> alertList) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.dateOfBirth = dateOfBirth;
        this.userType = userType;
        this.address = address;
        this.deliveryAddresses = deliveryAddresses;
        this.panCardNumber = panCardNumber;
        this.gstNumber = gstNumber;
        this.vehicleInfo = vehicleInfo;
        this.alertList = alertList;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<Address> getDeliveryAddresses() {
        return deliveryAddresses;
    }

    public void setDeliveryAddresses(List<Address> deliveryAddresses) {
        this.deliveryAddresses = deliveryAddresses;
    }

    public String getPanCardNumber() {
        return panCardNumber;
    }

    public void setPanCardNumber(String panCardNumber) {
        this.panCardNumber = panCardNumber;
    }

    public String getGstIdNumber() {
        return gstNumber;
    }

    public void setGstIdNumber(String gstNumber) {
        this.gstNumber = gstNumber;
    }

    public Vehicle getVehicleInfo() {
        return vehicleInfo;
    }

    public void setVehicleInfo(Vehicle vehicleInfo) {
        this.vehicleInfo = vehicleInfo;
    }

    public List<Alert> getAlertList() {
        return alertList;
    }

    public void setAlertList(List<Alert> alertList) {
        this.alertList = alertList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(userId, user.userId) && Objects.equals(firstName, user.firstName) && Objects.equals(lastName, user.lastName) && Objects.equals(email, user.email) && Objects.equals(phoneNumber, user.phoneNumber) && Objects.equals(dateOfBirth, user.dateOfBirth) && userType == user.userType && Objects.equals(address, user.address) && Objects.equals(deliveryAddresses, user.deliveryAddresses) && Objects.equals(panCardNumber, user.panCardNumber) && Objects.equals(gstNumber, user.gstNumber) && Objects.equals(vehicleInfo, user.vehicleInfo);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, firstName, lastName, email, phoneNumber, dateOfBirth, userType, address, deliveryAddresses, panCardNumber, gstNumber, vehicleInfo);
    }

    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", dateOfBirth='" + dateOfBirth + '\'' +
                ", userType=" + userType +
                ", address=" + address +
                ", deliveryAddresses=" + deliveryAddresses +
                ", panCardNumber='" + panCardNumber + '\'' +
                ", gstNumber='" + gstNumber + '\'' +
                ", vehicleInfo=" + vehicleInfo +
                ", alertList=" + alertList +
                '}';
    }
}
