package com.eKirana.OrderService.service;

import com.eKirana.OrderService.exception.OrderAlreadyExistsException;
import com.eKirana.OrderService.exception.OrderNotFoundException;
import com.eKirana.SharedLibrary.model.order.Order;
import com.eKirana.SharedLibrary.model.order.OrderStatus;
import com.eKirana.SharedLibrary.model.user.User;

import java.util.Date;
import java.util.List;

public interface IOrderService {
    Order placeOrder(Order order) throws OrderAlreadyExistsException;
    List<Order> getAllOrdersByCustomerId(String customerId);
    List<Order> getAllOrdersBySellerId(String sellerId);
    List<Order> getAllOrdersByCarrierId(String carrierId);
    List<Order> getAllOrders();
    Order getOrderById(String orderId) throws OrderNotFoundException;
    Order cancelOrder(String orderId) throws OrderNotFoundException;
    Order updateOrderStatus(String orderId, OrderStatus newStatus) throws OrderNotFoundException;
    Order updateOrderCarrier(String orderId, User newCarrierInfo) throws OrderNotFoundException;
    Order updateOrderComments(String orderId, String newComments) throws OrderNotFoundException;
    Order updateOrderDeliveryDate(String orderId, Date newDeliveredOn) throws OrderNotFoundException;
}
