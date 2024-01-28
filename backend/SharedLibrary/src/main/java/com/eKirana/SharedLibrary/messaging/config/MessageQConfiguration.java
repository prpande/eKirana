package com.eKirana.SharedLibrary.messaging.config;

import com.eKirana.SharedLibrary.messaging.Constants;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MessageQConfiguration {
    @Bean
    public Queue alertQueue() {
        return new Queue(Constants.ALERT_QUEUE_NAME);
    }

    @Bean
    public Queue orderQueue() {
        return new Queue(Constants.ORDER_QUEUE_NAME);
    }

    @Bean
    public Queue failedOrderQueue() {
        return new Queue(Constants.FAILED_ORDER_QUEUE_NAME);
    }


    @Bean
    public DirectExchange eKiranaExchange(){
        return new DirectExchange(Constants.eKIRANA_EXCHANGE_NAME);
    }

    @Bean
    public Binding alertQBinding(Queue alertQueue, DirectExchange eKiranaExchange){
        return BindingBuilder.bind(alertQueue)
                .to(eKiranaExchange)
                .with(Constants.ALERT_ROUTING_KEY);
    }

    @Bean
    public Binding orderQBinding(Queue orderQueue, DirectExchange eKiranaExchange){
        return BindingBuilder.bind(orderQueue)
                .to(eKiranaExchange)
                .with(Constants.ORDER_ROUTING_KEY);
    }

    @Bean
    public Binding failedOrderQBinding(Queue failedOrderQueue, DirectExchange eKiranaExchange){
        return BindingBuilder.bind(failedOrderQueue)
                .to(eKiranaExchange)
                .with(Constants.FAILED_ORDER_ROUTING_KEY);
    }

    @Bean
    public MessageConverter messageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory factory){
        RabbitTemplate rabbitTemplate = new RabbitTemplate(factory);
        rabbitTemplate.setMessageConverter(messageConverter());
        return rabbitTemplate;
    }
}
