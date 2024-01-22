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

    private boolean isDelivering;
    private double latitude;
    private double longitude;
}
```

### enum `UserType`

Enum representing the type of the User registered.

```java
public enum UserType {
    SELLER,
    CUSTOMER,
    CARRIER,
    ADMIN
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
    
    private UserType userType;

    private Address address; // mailing address for customer and carrier , shop address for seller
    private List<Address> deliveryAddresses; // list of delivery addresses for customer

    private String panCardNumber; // PAN card # for seller and carrier
    private String gstIdNumber; // GST IN for seller

    private VehicleInfo vehicleInfo; // details of carrier vehicle
}
```

## Product Service

### class `Product`

Class representing a product on sale by a `seller` on the application.

```java
@Document
public class Product {
    @Id
    private String productId;

    private String name;
    private double price;
    private String specifications;
    private String description;
    private List<String> imageUrl;

    private boolean available;
    private int quantity; // reflect quantity in stock, also used as item quantity when placing orders
    private String sellerId;
}
```

## Order Service

### enum `OrderStatus`

Enum representing the state in which an order placed on the application can be in.

```java
public enum OrderStatus {
    INITIALIZED,
    CONFIRMED,
    SHIPPED,
    DELIVERED,
    CANCELLATION_REQUESTED,
    CANCELLED
}
```

### class `Order`

Class representing an order placed by a `customer` on the application.

```java
@Document
public class Order {
    @Id
    private String orderId;

    private List<Product> orderedItems;
    private double totalAmount;
    private Address deliveryAddress;
    private OrderStatus status;
    private Date placedOn;
    private Date deliveredOn; // can also stored expected delivery date if deliveredOn > current Date

    private User customer;
    private User seller;
    private User carrier;

    private String comments;
}
```
