package com.eKirana.SharedLibrary.messaging;

import com.eKirana.SharedLibrary.messaging.model.Alert;
import com.eKirana.SharedLibrary.messaging.model.AlertQMessage;
import com.eKirana.SharedLibrary.model.order.Order;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MessagePublisherImpl implements IMessagePublisher {
    private final RabbitTemplate rabbitTemplate;

    @Autowired
    public MessagePublisherImpl(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }


    @Override
    public void publishAlert(AlertQMessage alertQMessage) {
        rabbitTemplate.convertAndSend(Constants.eKIRANA_EXCHANGE_NAME, Constants.ALERT_ROUTING_KEY, alertQMessage);
    }

    @Override
    public void publishOrder(Order order) {
        rabbitTemplate.convertAndSend(Constants.eKIRANA_EXCHANGE_NAME, Constants.ORDER_ROUTING_KEY, order);
    }

    @Override
    public void publishFailedOrder(Order order) {
        rabbitTemplate.convertAndSend(Constants.eKIRANA_EXCHANGE_NAME, Constants.FAILED_ORDER_ROUTING_KEY, order);
    }
}
