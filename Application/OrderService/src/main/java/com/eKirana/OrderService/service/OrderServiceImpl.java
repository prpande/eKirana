package com.eKirana.OrderService.service;

import com.eKirana.OrderService.exception.OrderAlreadyExistsException;
import com.eKirana.OrderService.exception.OrderNotFoundException;
import com.eKirana.OrderService.repository.OrderRepository;
import com.eKirana.SharedLibrary.model.order.Order;
import com.eKirana.SharedLibrary.model.order.OrderStatus;
import com.eKirana.SharedLibrary.model.user.User;
import com.eKirana.SharedLibrary.model.user.UserType;
import com.eKirana.SharedLibrary.security.exception.UnauthorizedUserTypeException;
import com.eKirana.SharedLibrary.security.exception.UserIsNotOwnerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static com.eKirana.SharedLibrary.security.Constants.SYSTEM_USER_ID;

@Service
public class OrderServiceImpl implements IOrderService {
    private OrderRepository orderRepository;
    private final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Order placeOrder(Order order, String userId) throws OrderAlreadyExistsException {
        if (orderRepository.findById(order.getOrderId()).isPresent()) {
            throw new OrderAlreadyExistsException();
        }

        order.setStatus(OrderStatus.INITIALIZED);
        order.setCustomerId(userId);
        order.setSellerId(order.getOrderedItems().get(0).getSellerId());
        order.setCarrierId(null);
        // TODO - confirm from seller using amqp and update status and product inventory
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrdersByUserId(String userId, UserType userType) throws UnauthorizedUserTypeException {
        switch (userType) {
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
    public List<Order> getOrdersAvailableForDelivery(UserType userType) throws UnauthorizedUserTypeException {
        if (userType != UserType.CARRIER) {
            logger.error("[getOrdersAvailableForDelivery]: Invalid UserType: " + userType);
            throw new UnauthorizedUserTypeException();
        }

        return orderRepository.getOrdersAvailableForDelivery();
    }

    @Override
    public Order getOrderById(String orderId, String userId) throws OrderNotFoundException, UserIsNotOwnerException {
        Optional<Order> optOrder = orderRepository.findById(orderId);
        if (optOrder.isEmpty()) {
            throw new OrderNotFoundException();
        }

        Order order = optOrder.get();
        if (!isSellerCustomerCarrierOrAdmin(order, userId)) {
            throw new UserIsNotOwnerException();
        }

        return order;
    }

    @Override
    public Order cancelOrder(String orderId, String userId) throws OrderNotFoundException, UserIsNotOwnerException {
        Optional<Order> optOrder = orderRepository.findById(orderId);
        if (optOrder.isEmpty()) {
            throw new OrderNotFoundException();
        }

        Order order = optOrder.get();
        if (!isSellerCustomerCarrierOrAdmin(order, userId)) {
            throw new UserIsNotOwnerException();
        }

        order.setStatus(OrderStatus.CANCELLATION_REQUESTED);
        // TODO - confirm cancellation from seller using amqp
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrderStatus(String orderId, OrderStatus newStatus, String userId) throws OrderNotFoundException, UserIsNotOwnerException {
        Optional<Order> optOrder = orderRepository.findById(orderId);
        if (optOrder.isEmpty()) {
            throw new OrderNotFoundException();
        }

        Order order = optOrder.get();
        if (!isSellerCarrierOrAdmin(order, userId)) {
            throw new UserIsNotOwnerException();
        }

        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrderCarrier(String orderId, String userId, UserType userType) throws OrderNotFoundException, UnauthorizedUserTypeException {
        if (userType != UserType.CARRIER) {
            throw new UnauthorizedUserTypeException();
        }

        Optional<Order> optOrder = orderRepository.findById(orderId);
        if (optOrder.isEmpty()) {
            throw new OrderNotFoundException();
        }

        Order order = optOrder.get();
        order.setCarrierId(userId);
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrderComments(String orderId, String newComments, String userId) throws OrderNotFoundException, UserIsNotOwnerException {
        Optional<Order> optOrder = orderRepository.findById(orderId);
        if (optOrder.isEmpty()) {
            throw new OrderNotFoundException();
        }

        Order order = optOrder.get();
        if (!isSellerCustomerCarrierOrAdmin(order, userId)) {
            throw new UserIsNotOwnerException();
        }

        order.setComments(newComments);
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrderDeliveryDate(String orderId, Date newDeliveredOn, String userId) throws OrderNotFoundException, UserIsNotOwnerException {
        Optional<Order> optOrder = orderRepository.findById(orderId);
        if (optOrder.isEmpty()) {
            throw new OrderNotFoundException();
        }

        Order order = optOrder.get();
        if (!isSellerCarrierOrAdmin(order, userId)) {
            throw new UserIsNotOwnerException();
        }
        order.setDeliveredOn(newDeliveredOn);
        return orderRepository.save(order);
    }

    private boolean isSellerCustomerCarrierOrAdmin(Order order, String userId) {
        return userId.equals(order.getCustomerId()) ||
                userId.equals(order.getSellerId()) ||
                userId.equals(order.getCarrierId()) ||
                userId.equals(SYSTEM_USER_ID);
    }


    private boolean isSellerCarrierOrAdmin(Order order, String userId) {
        return userId.equals(order.getSellerId()) ||
                userId.equals(order.getCarrierId()) ||
                userId.equals(SYSTEM_USER_ID);
    }
}
