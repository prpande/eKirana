package com.eKirana.SharedLibrary.messaging;

public class Constants {
    public static final String ALERT_QUEUE_NAME = "q.user-alert";
    public static final String ALERT_ROUTING_KEY = "alertq-routing-key";
    public static final String eKIRANA_EXCHANGE_NAME = "x.eKirana";

    public static final String ORDER_QUEUE_NAME = "q.orders-placed";
    public static final String ORDER_ROUTING_KEY = "orders-placedq-routing-key";

    public static final String FAILED_ORDER_QUEUE_NAME = "q.orders-failed";
    public static final String FAILED_ORDER_ROUTING_KEY = "orders-failedq-routing-key";
}
