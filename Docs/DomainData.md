# Domain class details - eKirana

## Authorization Service

### class `UserCredential`

Class representing user credentials stored in the authorization service database

```java
@Entity
public class UserCredential {
    @Id
    private String userId;
    private String password;
    private String userType; // used in generating encryption key for JWT signing
}
```

## User Service

### class `Address`

Class representing a user address stored as part of the user data/ seller shop data.

```java
public class Address {
    private String fullName;
    private String line1;
    private String line2;
    private String landmark;
    private String city;
    private String state;
    private String phoneNumber;
    private boolean isDefault;
    private String instructions;
}
```

### class `VehicleInfo`

Class representing `carrier` user vehicle information data.

```java
public class VehicleInfo {
    private String drivingLicenseNumber;
    private String registrationNumber;
    private String make;
    private String model;
    private String vehicleType;
    private String capacity;
}
```

### class `User`

Class representing a user's information registered with the application

```java
@Document
public class User {
    @Id
    private String userId;
    
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String dateOfBirth;
    
    private String userType;

    private Address address; // mailing address for customer and carrier , shop address for seller
    private List<Address> deliveryAddresses; // list of delivery addresses for customer

    private String panCardNumber; // PAN card # for seller and carrier
    private String gstIdNumber; // GST IN for seller

    private VehicleInfo vehicleInfo; // details of carrier vehicle
}
```

## Product Service

