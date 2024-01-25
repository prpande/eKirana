package com.eKirana.SharedLibrary.model.order;

import com.eKirana.SharedLibrary.model.product.Product;
import com.eKirana.SharedLibrary.model.user.Address;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;
import java.util.Objects;

@Document
public class Order {
    @Id
    private String orderId;

    private List<Product> orderedItems;
    private double totalAmount;
    private Address deliveryAddress;
    private OrderStatus status;
    private Date placedOn;
    private Date deliveredOn; // can also stored expected delivery date if deliveredOn > current Date

    private String customerId;
    private String sellerId;
    private String carrierId;

    private String comments;

    public Order() {
    }

    public Order(String orderId,
                 List<Product> orderedItems,
                 double totalAmount,
                 Address deliveryAddress,
                 OrderStatus status,
                 Date placedOn,
                 Date deliveredOn,
                 String customerId,
                 String sellerId,
                 String carrierId,
                 String comments) {
        this.orderId = orderId;
        this.orderedItems = orderedItems;
        this.totalAmount = totalAmount;
        this.deliveryAddress = deliveryAddress;
        this.status = status;
        this.placedOn = placedOn;
        this.deliveredOn = deliveredOn;
        this.customerId = customerId;
        this.sellerId = sellerId;
        this.carrierId = carrierId;
        this.comments = comments;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public List<Product> getOrderedItems() {
        return orderedItems;
    }

    public void setOrderedItems(List<Product> orderedItems) {
        this.orderedItems = orderedItems;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Address getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(Address deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Date getPlacedOn() {
        return placedOn;
    }

    public void setPlacedOn(Date placedOn) {
        this.placedOn = placedOn;
    }

    public Date getDeliveredOn() {
        return deliveredOn;
    }

    public void setDeliveredOn(Date deliveredOn) {
        this.deliveredOn = deliveredOn;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getSellerId() {
        return sellerId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }

    public String getCarrierId() {
        return carrierId;
    }

    public void setCarrierId(String carrierId) {
        this.carrierId = carrierId;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return Double.compare(order.totalAmount, totalAmount) == 0 &&
                Objects.equals(orderId, order.orderId) &&
                Objects.equals(orderedItems, order.orderedItems) &&
                Objects.equals(deliveryAddress, order.deliveryAddress) &&
                status == order.status &&
                Objects.equals(placedOn, order.placedOn) &&
                Objects.equals(deliveredOn, order.deliveredOn) &&
                Objects.equals(customerId, order.customerId) &&
                Objects.equals(sellerId, order.sellerId) &&
                Objects.equals(carrierId, order.carrierId) &&
                Objects.equals(comments, order.comments);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId,
                orderedItems,
                totalAmount,
                deliveryAddress,
                status,
                placedOn,
                deliveredOn,
                customerId,
                sellerId,
                carrierId,
                comments);
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderId='" + orderId + '\'' +
                ", orderedItems=" + orderedItems +
                ", totalAmount=" + totalAmount +
                ", deliveryAddress=" + deliveryAddress +
                ", status=" + status +
                ", placedOn=" + placedOn +
                ", deliveredOn=" + deliveredOn +
                ", customerId=" + customerId +
                ", sellerId=" + sellerId +
                ", carrierId=" + carrierId +
                ", comments='" + comments + '\'' +
                '}';
    }
}