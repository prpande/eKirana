package com.eKirana.SharedLibrary.messaging;

import com.eKirana.SharedLibrary.messaging.model.AlertQMessage;
import com.eKirana.SharedLibrary.model.order.Order;

public interface IMessagePublisher {
    void publishAlert(AlertQMessage alertQMessage);
    void publishOrder(Order order);
    void publishFailedOrder(Order order);
}
