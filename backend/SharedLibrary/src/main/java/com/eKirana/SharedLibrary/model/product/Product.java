package com.eKirana.SharedLibrary.model.product;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Objects;

@Document
public class Product {
    @Id
    private String productId;

    private String name;
    private double price;
    private String specifications;
    private String description;
    private String category;
    private String imageUrl;
    private boolean available;

    private int quantity; // reflect quantity in stock, also used as item quantity when placing orders
    private String sellerId;
    public Product() {
    }

    public Product(String productId,
                   String name,
                   double price,
                   String specifications,
                   String description,
                   String category,
                   String imageUrl,
                   boolean available,
                   int quantity,
                   String sellerId) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.specifications = specifications;
        this.description = description;
        this.category = category;
        this.imageUrl = imageUrl;
        this.available = available;
        this.quantity = quantity;
        this.sellerId = sellerId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getSpecifications() {
        return specifications;
    }

    public void setSpecifications(String specifications) {
        this.specifications = specifications;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public boolean isAvailable() {
        return available;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getSellerId() {
        return sellerId;
    }

    public void setSellerId(String sellerId) {
        this.sellerId = sellerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Double.compare(product.price, price) == 0 &&
                available == product.available &&
                quantity == product.quantity &&
                Objects.equals(productId, product.productId) &&
                Objects.equals(name, product.name) &&
                Objects.equals(specifications, product.specifications) &&
                Objects.equals(description, product.description) &&
                Objects.equals(category, product.category) &&
                Objects.equals(imageUrl, product.imageUrl) &&
                Objects.equals(sellerId, product.sellerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId,
                name,
                price,
                specifications,
                description,
                category,
                imageUrl,
                available,
                quantity,
                sellerId);
    }

    @Override
    public String toString() {
        return "Product{" +
                "productId='" + productId + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", specifications='" + specifications + '\'' +
                ", description='" + description + '\'' +
                ", category='" + category + '\'' +
                ", imageUrl=" + imageUrl +
                ", available=" + available +
                ", quantity=" + quantity +
                ", sellerId='" + sellerId + '\'' +
                '}';
    }
}
