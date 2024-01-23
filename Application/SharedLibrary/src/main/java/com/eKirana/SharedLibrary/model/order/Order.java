package com.eKirana.SharedLibrary.model.order;

import com.eKirana.SharedLibrary.model.product.Product;
import com.eKirana.SharedLibrary.model.user.Address;
import com.eKirana.SharedLibrary.model.user.User;
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

    private User customer;
    private User seller;
    private User carrier;

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
                 User customer,
                 User seller,
                 User carrier,
                 String comments) {
        this.orderId = orderId;
        this.orderedItems = orderedItems;
        this.totalAmount = totalAmount;
        this.deliveryAddress = deliveryAddress;
        this.status = status;
        this.placedOn = placedOn;
        this.deliveredOn = deliveredOn;
        this.customer = customer;
        this.seller = seller;
        this.carrier = carrier;
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

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    public User getSeller() {
        return seller;
    }

    public void setSeller(User seller) {
        this.seller = seller;
    }

    public User getCarrier() {
        return carrier;
    }

    public void setCarrier(User carrier) {
        this.carrier = carrier;
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
                Objects.equals(customer, order.customer) &&
                Objects.equals(seller, order.seller) &&
                Objects.equals(carrier, order.carrier) &&
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
                customer,
                seller,
                carrier,
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
                ", customer=" + customer +
                ", seller=" + seller +
                ", carrier=" + carrier +
                ", comments='" + comments + '\'' +
                '}';
    }
}