package com.eKirana.OrderService.service;

import com.eKirana.OrderService.exception.OrderAlreadyExistsException;
import com.eKirana.OrderService.exception.OrderNotFoundException;
import com.eKirana.SharedLibrary.model.order.Order;
import com.eKirana.SharedLibrary.model.order.OrderStatus;
import com.eKirana.SharedLibrary.model.user.User;
import com.eKirana.SharedLibrary.model.user.UserType;
import com.eKirana.SharedLibrary.security.UnauthorizedUserTypeException;

import java.util.Date;
import java.util.List;

public interface IOrderService {
    Order placeOrder(Order order) throws OrderAlreadyExistsException;
    List<Order> getAllOrdersByUserId(String userId, UserType userType) throws UnauthorizedUserTypeException;
    List<Order> getAllOrders();
    Order getOrderById(String orderId) throws OrderNotFoundException;
    Order cancelOrder(String orderId) throws OrderNotFoundException;
    Order updateOrderStatus(String orderId, OrderStatus newStatus) throws OrderNotFoundException;
    Order updateOrderCarrier(String orderId, User newCarrierInfo) throws OrderNotFoundException;
    Order updateOrderComments(String orderId, String newComments) throws OrderNotFoundException;
    Order updateOrderDeliveryDate(String orderId, Date newDeliveredOn) throws OrderNotFoundException;
}
