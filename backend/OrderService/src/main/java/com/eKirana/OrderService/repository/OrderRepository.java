package com.eKirana.OrderService.repository;


import com.eKirana.SharedLibrary.model.order.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    @Query("{ 'customerId': ?0}")
    List<Order> getAllOrdersByCustomerId(String customerId);

    @Query("{ 'sellerId': ?0}")
    List<Order> getAllOrdersBySellerId(String sellerId);

    @Query("{ 'carrierId': ?0}")
    List<Order> getAllOrdersByCarrierId(String carrierId);

    @Query("{ 'carrierId': null, 'status': 'CONFIRMED'}")
    List<Order> getOrdersAvailableForDelivery();
}
