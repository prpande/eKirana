package com.eKirana.SharedLibrary.model.user;

import org.springframework.data.annotation.Id;

import java.util.Objects;

public class Address {
    @Id
    private String addressId;
    private String fullName;
    private String line1;
    private String line2;
    private String landmark;
    private String city;
    private String state;

    private int pinCode;
    private double latitude;
    private double longitude;
    private String phoneNumber;
    private boolean isDefault;
    private String instructions;
    private String displayImageUrl;

    public Address() {
    }

    public Address(String addressId,
                   String fullName,
                   String line1,
                   String line2,
                   String landmark,
                   String city,
                   String state,
                   int pinCode,
                   double latitude,
                   double longitude,
                   String phoneNumber,
                   boolean isDefault,
                   String instructions,
                   String displayImageUrl) {
        this.addressId = addressId;
        this.fullName = fullName;
        this.line1 = line1;
        this.line2 = line2;
        this.landmark = landmark;
        this.city = city;
        this.state = state;
        this.pinCode = pinCode;
        this.latitude = latitude;
        this.longitude = longitude;
        this.phoneNumber = phoneNumber;
        this.isDefault = isDefault;
        this.instructions = instructions;
        this.displayImageUrl = displayImageUrl;
    }

    public String getAddressId() {
        return addressId;
    }

    public void setAddressId(String addressId) {
        this.addressId = addressId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getLine1() {
        return line1;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }

    public String getLine2() {
        return line2;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }

    public String getLandmark() {
        return landmark;
    }

    public void setLandmark(String landmark) {
        this.landmark = landmark;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public int getPinCode() {
        return pinCode;
    }

    public void setPinCode(int pinCode) {
        this.pinCode = pinCode;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getDisplayImageUrl() {
        return displayImageUrl;
    }

    public void setDisplayImageUrl(String displayImageUrl) {
        this.displayImageUrl = displayImageUrl;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return pinCode == address.pinCode && Double.compare(address.latitude, latitude) == 0 && Double.compare(address.longitude, longitude) == 0 && Objects.equals(fullName, address.fullName) && Objects.equals(line1, address.line1) && Objects.equals(line2, address.line2) && Objects.equals(landmark, address.landmark) && Objects.equals(city, address.city) && Objects.equals(state, address.state);
    }

    @Override
    public int hashCode() {
        return Objects.hash(fullName, line1, line2, landmark, city, state, pinCode, latitude, longitude);
    }

    @Override
    public String toString() {
        return "Address{" +
                "addressId='" + addressId + '\'' +
                ", fullName='" + fullName + '\'' +
                ", line1='" + line1 + '\'' +
                ", line2='" + line2 + '\'' +
                ", landmark='" + landmark + '\'' +
                ", city='" + city + '\'' +
                ", state='" + state + '\'' +
                ", pinCode=" + pinCode +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", isDefault=" + isDefault +
                ", instructions='" + instructions + '\'' +
                ", displayImageUrl='" + displayImageUrl + '\'' +
                '}';
    }
}
