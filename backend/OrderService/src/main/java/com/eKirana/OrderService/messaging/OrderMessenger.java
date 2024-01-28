package com.eKirana.OrderService.messaging;

import com.eKirana.OrderService.service.IOrderService;
import com.eKirana.SharedLibrary.messaging.Constants;
import com.eKirana.SharedLibrary.model.order.Order;
import com.eKirana.SharedLibrary.model.order.OrderStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class OrderMessenger {
    private final IOrderService orderService;
    private final Logger logger = LoggerFactory.getLogger(OrderMessenger.class);

    @Autowired
    public OrderMessenger(IOrderService orderService) {
        this.orderService = orderService;
    }

    @RabbitListener(queues = Constants.FAILED_ORDER_QUEUE_NAME)
    private void failedOrderQueueListener(Order order){
        logger.info("[failedOrderQueueListener]: Processing failed Order:[{}]", order.getOrderId());
        orderService.systemUpdateOrderStatus(order.getOrderId(), OrderStatus.CANCELLED);
    }
}
