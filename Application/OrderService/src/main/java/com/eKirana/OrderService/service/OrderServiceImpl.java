package com.eKirana.OrderService.service;

import com.eKirana.OrderService.controller.OrderController;
import com.eKirana.OrderService.exception.OrderAlreadyExistsException;
import com.eKirana.OrderService.exception.OrderNotFoundException;
import com.eKirana.OrderService.repository.OrderRepository;
import com.eKirana.SharedLibrary.model.order.Order;
import com.eKirana.SharedLibrary.model.order.OrderStatus;
import com.eKirana.SharedLibrary.model.user.User;
import com.eKirana.SharedLibrary.model.user.UserType;
import com.eKirana.SharedLibrary.security.UnauthorizedUserTypeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements IOrderService{
    private OrderRepository orderRepository;
    private final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);
    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order placeOrder(Order order) throws OrderAlreadyExistsException {
        if(orderRepository.findById(order.getOrderId()).isPresent()){
            throw new OrderAlreadyExistsException();
        }

        order.setStatus(OrderStatus.INITIALIZED);
        // TODO - confirm from seller using amqp and update status and product inventory
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrdersByUserId(String userId, UserType userType) throws UnauthorizedUserTypeException {
        switch (userType){
            case CUSTOMER:
                return orderRepository.getAllOrdersByCustomerId(userId);
            case SELLER:
                return orderRepository.getAllOrdersBySellerId(userId);
            case CARRIER:
                return orderRepository.getAllOrdersByCarrierId(userId);
            default:
                logger.error("[getAllOrdersByUserId]: Invalid UserType: " + userType);
                throw new UnauthorizedUserTypeException();
        }
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(String orderId) throws OrderNotFoundException {
        Optional<Order> optOrder = orderRepository.findById(orderId);
        if(optOrder.isEmpty()){
            throw new OrderNotFoundException();
        }

        return optOrder.get();
    }

    @Override
    public Order cancelOrder(String orderId) throws OrderNotFoundException {
        Optional<Order> optOrder = orderRepository.findById(orderId);
        if(optOrder.isEmpty()){
            throw new OrderNotFoundException();
        }

        Order order = optOrder.get();
        order.setStatus(OrderStatus.CANCELLATION_REQUESTED);
        // TODO - confirm cancellation from seller using amqp
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrderStatus(String orderId, OrderStatus newStatus) throws OrderNotFoundException {
        Optional<Order> optOrder = orderRepository.findById(orderId);
        if(optOrder.isEmpty()){
            throw new OrderNotFoundException();
        }

        Order order = optOrder.get();
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrderCarrier(String orderId, User newCarrierInfo) throws OrderNotFoundException {
        Optional<Order> optOrder = orderRepository.findById(orderId);
        if(optOrder.isEmpty()){
            throw new OrderNotFoundException();
        }

        Order order = optOrder.get();
        order.setCarrier(newCarrierInfo);
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrderComments(String orderId, String newComments) throws OrderNotFoundException {
        Optional<Order> optOrder = orderRepository.findById(orderId);
        if(optOrder.isEmpty()){
            throw new OrderNotFoundException();
        }

        Order order = optOrder.get();
        order.setComments(newComments);
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrderDeliveryDate(String orderId, Date newDeliveredOn) throws OrderNotFoundException {
        Optional<Order> optOrder = orderRepository.findById(orderId);
        if(optOrder.isEmpty()){
            throw new OrderNotFoundException();
        }

        Order order = optOrder.get();
        order.setDeliveredOn(newDeliveredOn);
        return orderRepository.save(order);
    }
}
