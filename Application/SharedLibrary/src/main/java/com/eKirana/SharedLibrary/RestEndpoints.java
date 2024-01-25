package com.eKirana.SharedLibrary;

public class RestEndpoints {

    //region Authorization Service endpoints
    public static final String AUTHORIZATION_ROOT = "/api/auth";
    public static final String SAVE_CREDENTIALS = "/userCredential";
    public static final String LOGIN = "/login";
    public static final String UPDATE_PASSWORD = "/password";
    public static final String[] AUTHORIZATION_SECURE_PATTERNS = new String[]{AUTHORIZATION_ROOT + UPDATE_PASSWORD};
    //endregion

    //region User Service endpoints
    public static final String USER_ROOT = "/api/user";
    public static final String[] USER_SECURE_PATTERNS = new String[]{USER_ROOT};
    //endregion

    //region Product Service endpoints
    public static final String PRODUCT_ROOT = "/api/product";
    public static final String[] PRODUCT_SECURE_PATTERNS = new String[]{PRODUCT_ROOT};
    //endregion

    //region Order Service endpoints
    public static final String ORDER_ROOT = "/api/order";
    public static final String PLACE_ORDER = "";
    public static final String GET_ALL_ORDERS_BY_USER_ID = "/user/{userId}";
    public static final String GET_ALL_ORDERS = "";
    public static final String GET_ORDER_BY_ID = "/{orderId}";
    public static final String CANCEL_ORDER = "/{orderId}";
    public static final String UPDATE_ORDER_STATUS = "/{orderId}/status";
    public static final String UPDATE_ORDER_CARRIER = "/{orderId}/carrier";
    public static final String UPDATE_ORDER_COMMENTS = "/{orderId}/comments";
    public static final String UPDATE_ORDER_DELIVERY_DATE = "/{orderId}/deliveryDate";
    public static final String[] ORDER_SECURE_PATTERNS = new String[]{ORDER_ROOT};
    //endregion

    //region Test
    public static final String z = "test";
    //endregion
}
