package com.eKirana.SharedLibrary.model.user;

import org.springframework.data.annotation.Id;

import java.util.Objects;

public class Vehicle {
    @Id
    private String registrationNumber;
    private String drivingLicenseNumber;


    private String make;
    private String model;

    private String vehicleType;
    private String capacity;

    private boolean isDelivering;
    private double latitude;
    private double longitude;

    public Vehicle() {
    }

    public Vehicle(String drivingLicenseNumber, String registrationNumber, String make, String model, String vehicleType, String capacity, boolean isDelivering, double latitude, double longitude) {
        this.drivingLicenseNumber = drivingLicenseNumber;
        this.registrationNumber = registrationNumber;
        this.make = make;
        this.model = model;
        this.vehicleType = vehicleType;
        this.capacity = capacity;
        this.isDelivering = isDelivering;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getDrivingLicenseNumber() {
        return drivingLicenseNumber;
    }

    public void setDrivingLicenseNumber(String drivingLicenseNumber) {
        this.drivingLicenseNumber = drivingLicenseNumber;
    }

    public String getRegistrationNumber() {
        return registrationNumber;
    }

    public void setRegistrationNumber(String registrationNumber) {
        this.registrationNumber = registrationNumber;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public String getCapacity() {
        return capacity;
    }

    public void setCapacity(String capacity) {
        this.capacity = capacity;
    }

    public boolean isDelivering() {
        return isDelivering;
    }

    public void setDelivering(boolean delivering) {
        isDelivering = delivering;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vehicle vehicle = (Vehicle) o;
        return Objects.equals(drivingLicenseNumber, vehicle.drivingLicenseNumber) && Objects.equals(registrationNumber, vehicle.registrationNumber) && Objects.equals(make, vehicle.make) && Objects.equals(model, vehicle.model) && Objects.equals(vehicleType, vehicle.vehicleType) && Objects.equals(capacity, vehicle.capacity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(drivingLicenseNumber, registrationNumber, make, model, vehicleType, capacity);
    }

    @Override
    public String toString() {
        return "Vehicle{" +
                "drivingLicenseNumber='" + drivingLicenseNumber + '\'' +
                ", registrationNumber='" + registrationNumber + '\'' +
                ", make='" + make + '\'' +
                ", model='" + model + '\'' +
                ", vehicleType='" + vehicleType + '\'' +
                ", capacity='" + capacity + '\'' +
                ", isDelivering=" + isDelivering +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                '}';
    }
}
