package com.eKirana.OrderService.service;

import com.eKirana.OrderService.repository.OrderRepository;
import com.eKirana.SharedLibrary.messaging.IMessagePublisher;
import com.eKirana.SharedLibrary.messaging.model.Alert;
import com.eKirana.SharedLibrary.messaging.model.AlertLevel;
import com.eKirana.SharedLibrary.messaging.model.AlertQMessage;
import com.eKirana.SharedLibrary.model.order.Order;
import com.eKirana.SharedLibrary.model.order.OrderStatus;
import com.eKirana.SharedLibrary.model.order.exception.OrderAlreadyExistsException;
import com.eKirana.SharedLibrary.model.order.exception.OrderNotConfirmedException;
import com.eKirana.SharedLibrary.model.order.exception.OrderNotFoundException;
import com.eKirana.SharedLibrary.model.product.Product;
import com.eKirana.SharedLibrary.model.product.exception.InsufficientProductQuantityException;
import com.eKirana.SharedLibrary.model.user.UserType;
import com.eKirana.SharedLibrary.security.exception.UnauthorizedUserTypeException;
import com.eKirana.SharedLibrary.security.exception.UserIsNotOwnerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.eKirana.SharedLibrary.security.Constants.SYSTEM_USER_ID;

@Service
public class OrderServiceImpl implements IOrderService {
    private OrderRepository orderRepository;
    private IMessagePublisher messagePublisher;
    private final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, IMessagePublisher messagePublisher) {
        this.orderRepository = orderRepository;
        this.messagePublisher = messagePublisher;
    }

    @Override
    public Order placeOrder(Order order, String userId) throws OrderAlreadyExistsException, InsufficientProductQuantityException {
        if (orderRepository.findById(order.getOrderId()).isPresent()) {
            throw new OrderAlreadyExistsException();
        }

        order.setCustomerId(userId);
        order.setSellerId(order.getOrderedItems().get(0).getSellerId());
        order.setCarrierId(null);
        order.setPlacedOn(new Date());
        Order savedOrder = orderRepository.save(order);
        messagePublisher.publishOrder(savedOrder);
        return systemUpdateOrderStatus(savedOrder.getOrderId(), OrderStatus.INITIALIZED);
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

        Order savedOrder = systemUpdateOrderStatus(order.getOrderId(), OrderStatus.CANCELLATION_REQUESTED);
        // TODO - confirm cancellation from seller using amqp
        return savedOrder;
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


        if(newStatus == OrderStatus.CANCELLED) {
            List<Product> items = order.getOrderedItems();
            for(Product item : items){
                item.setQuantity(-item.getQuantity());
            }
            order.setOrderedItems(items);
            messagePublisher.publishOrder(order);
        }

        return systemUpdateOrderStatus(order.getOrderId(), newStatus);
    }

    @Override
    public  Order systemUpdateOrderStatus(String orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId).get();
        OrderStatus oldStatus = order.getStatus();
        if(oldStatus == newStatus){
            throw new OrderAlreadyExistsException();
        }
        order.setStatus(newStatus);

        Order savedOrder = orderRepository.save(order);
        String alertMsg = String.format("Order:[%s] Status change:[%s]->[%s].", order.getOrderId(), oldStatus, savedOrder.getStatus());
        AlertLevel alertLevel = AlertLevel.CRITICAL;
        switch (newStatus){
            case CONFIRMED:
            case DELIVERED:
                alertLevel = AlertLevel.MEDIUM;
                break;
            case SHIPPED:
                alertLevel = AlertLevel.LOW;
                break;
        }
        publishOrderAlerts(savedOrder, alertMsg, alertLevel);

        return savedOrder;
    }
    @Override
    public Order updateOrderCarrier(String orderId, String userId, UserType userType) throws OrderNotFoundException, UnauthorizedUserTypeException, OrderNotConfirmedException {
        if (userType != UserType.CARRIER) {
            throw new UnauthorizedUserTypeException();
        }

        Optional<Order> optOrder = orderRepository.findById(orderId);
        if (optOrder.isEmpty()) {
            throw new OrderNotFoundException();
        }

        Order order = optOrder.get();
        if(order.getStatus() != OrderStatus.CONFIRMED){
            throw new OrderNotConfirmedException();
        }
        order.setCarrierId(userId);
        Order savedOrder = orderRepository.save(order);

        String alertMsg = String.format("Order:[%s] Carrier assigned: Id:[%s].", order.getOrderId(), userId);
        publishOrderAlerts(savedOrder, alertMsg, AlertLevel.LOW);

        return savedOrder;
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

        String comments = order.getComments() + "; " + newComments;
        order.setComments(comments);
        return orderRepository.save(order);
    }

    @Override
    public Order updateOrderDeliveryDate(String orderId, Date newDeliveredOn, String userId) throws OrderNotFoundException, UserIsNotOwnerException, OrderNotConfirmedException {
        Optional<Order> optOrder = orderRepository.findById(orderId);
        if (optOrder.isEmpty()) {
            throw new OrderNotFoundException();
        }

        Order order = optOrder.get();
        if(order.getStatus() != OrderStatus.CONFIRMED){
            throw new OrderNotConfirmedException();
        }

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

    private void publishOrderAlerts(Order order, String alertMsg, AlertLevel alertLevel) {
        Alert alert = new Alert(UUID.randomUUID().toString(), alertLevel, alertMsg, new Date(), false);
        messagePublisher.publishAlert(new AlertQMessage(order.getCustomerId(),alert));
        messagePublisher.publishAlert(new AlertQMessage(order.getSellerId(),alert));
        if(order.getCarrierId() != null){
            messagePublisher.publishAlert(new AlertQMessage(order.getCarrierId(), alert));
        }
    }
}
