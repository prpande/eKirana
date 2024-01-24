package com.eKirana.OrderService.repository;


import com.eKirana.SharedLibrary.model.order.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    @Query("{ 'customer.userId': ?0}")
    List<Order> getAllOrdersByCustomerId(String customerId);

    @Query("{ 'seller.userId': ?0}")
    List<Order> getAllOrdersBySellerId(String sellerId);

    @Query("{ 'carrier.userId': ?0}")
    List<Order> getAllOrdersByCarrierId(String carrierId);
}
