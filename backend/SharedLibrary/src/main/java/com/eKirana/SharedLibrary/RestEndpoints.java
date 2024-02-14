package com.eKirana.SharedLibrary;

public class RestEndpoints {

    //region Authorization Service endpoints
    public static final String AUTHORIZATION_ROOT = "/api/auth";
    public static final String CHECK_USER_ID = "/check";
    public static final String SAVE_CREDENTIALS = "/userCredential";
    public static final String LOGIN = "/login";
    public static final String UPDATE_PASSWORD = "/password";
    public static final String[] AUTHORIZATION_SECURE_PATTERNS = new String[]{AUTHORIZATION_ROOT + UPDATE_PASSWORD + "/*"};
    //endregion

    //region User Service endpoints
    public static final String USER_ROOT = "/api/user";
    public static final String CREATE_USER = "/info";
    public static final String UPDATE_USER = "/info";
    public static final String GET_USER_BY_ID = "/info";
    public static final String GET_ANOTHER_USER_BY_ID = "/info/other/{requestedUserId}";
    public static final String GET_ALL_USERS = "/infos";
    public static final String GET_ALL_SHOPS = "/shops";
    public static final String ADD_USER_ADDRESS = "/info/address";
    public static final String UPDATE_USER_ADDRESS = "/info/address";
    public static final String DELETE_USER_ADDRESS = "/info/address/{addressId}";
    public static final String SET_DELIVERY_STATUS = "/info/deliveryStatus";
    public static final String UPDATE_VEHICLE_INFO = "/info/vehicle";
    public static final String[] USER_SECURE_PATTERNS = new String[]{USER_ROOT + CREATE_USER + "/*"};
    //endregion

    //region Product Service endpoints
    public static final String PRODUCT_ROOT = "/api/product";
    public static final String SAVE_PRODUCT = "/secured";
    public static final String GET_PRODUCT_BY_ID = "/{productId}";
    public static final String GET_ALL_PRODUCT_BY_SELLER_ID = "/seller/{sellerId}";
    public static final String GET_ALL_PRODUCTS = "";
    public static final String UPDATE_PRODUCT = "/secured/{productId}";
    public static final String UPDATE_PRODUCT_QUANTITY = "/secured/{productId}/quantity";
    public static final String REMOVE_PRODUCT = "/secured/{productId}";
    public static final String ENABLE_PRODUCT = "/secured/{productId}/enable";
    public static final String DISABLE_PRODUCT = "/secured/{productId}/disable";

    public static final String[] PRODUCT_SECURE_PATTERNS = new String[]{PRODUCT_ROOT + SAVE_PRODUCT + "/*"};
    //endregion

    //region Order Service endpoints
    public static final String ORDER_ROOT = "/api/order";
    public static final String PLACE_ORDER = "/";
    public static final String GET_ALL_ORDERS_BY_USER_ID = "/user";
    public static final String GET_ALL_ORDERS = "/orders";
    public static final String GET_ORDERS_AVAILABLE_FOR_DELIVERY = "/delivery";
    public static final String GET_ORDER_BY_ID = "/{orderId}";
    public static final String CANCEL_ORDER = "/cancel/{orderId}";
    public static final String CONFIRM_ORDER = "/confirm/{orderId}";
    public static final String SHIP_ORDER = "/ship/{orderId}";
    public static final String DELIVER_ORDER = "/deliver/{orderId}";
    public static final String UPDATE_ORDER_CARRIER = "/{orderId}/carrier";
    public static final String UPDATE_ORDER_COMMENTS = "/{orderId}/comments";
    public static final String UPDATE_ORDER_DELIVERY_DATE = "/{orderId}/deliveryDate";
    public static final String[] ORDER_SECURE_PATTERNS = new String[]{ORDER_ROOT + "/*"};
    //endregion

    //region Image Service endpoints
    public static final String IMAGE_ROOT = "/api/image";
    public static final String SAVE_IMAGE = "/update";
    public static final String GET_IMAGE_BY_ID = "/{imageId}";
    public static final String GET_IMAGE_BY_USER_ID = "/user/{userId}";
    public static final String DELETE_IMAGE = "/update/{imageId}";
    public static final String[] IMAGE_SECURE_PATTERNS = new String[]{IMAGE_ROOT + SAVE_IMAGE + "/*"};
    //endregion
}
