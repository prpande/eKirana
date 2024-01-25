package com.eKirana.OrderService.service;

import com.eKirana.OrderService.exception.OrderAlreadyExistsException;
import com.eKirana.OrderService.exception.OrderNotFoundException;
import com.eKirana.SharedLibrary.model.order.Order;
import com.eKirana.SharedLibrary.model.order.OrderStatus;
import com.eKirana.SharedLibrary.model.user.UserType;
import com.eKirana.SharedLibrary.security.exception.UnauthorizedUserTypeException;
import com.eKirana.SharedLibrary.security.exception.UserIsNotOwnerException;

import java.util.Date;
import java.util.List;

public interface IOrderService {
    Order placeOrder(Order order, String userId) throws OrderAlreadyExistsException;
    List<Order> getAllOrdersByUserId(String userId, UserType userType) throws UnauthorizedUserTypeException;
    List<Order> getAllOrders();
    List<Order> getOrdersAvailableForDelivery(UserType userType) throws UnauthorizedUserTypeException;
    Order getOrderById(String orderId, String userId) throws OrderNotFoundException, UserIsNotOwnerException;
    Order cancelOrder(String orderId, String userId) throws OrderNotFoundException, UserIsNotOwnerException;
    Order updateOrderStatus(String orderId, OrderStatus newStatus, String userId) throws OrderNotFoundException, UserIsNotOwnerException;
    Order updateOrderCarrier(String orderId, String userId, UserType userType) throws OrderNotFoundException, UnauthorizedUserTypeException;
    Order updateOrderComments(String orderId, String newComments, String userId) throws OrderNotFoundException, UserIsNotOwnerException;
    Order updateOrderDeliveryDate(String orderId, Date newDeliveredOn, String userId) throws OrderNotFoundException, UserIsNotOwnerException;
}
