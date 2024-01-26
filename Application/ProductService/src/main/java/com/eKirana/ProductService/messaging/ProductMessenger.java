package com.eKirana.ProductService.messaging;

import com.eKirana.ProductService.service.IProductService;
import com.eKirana.SharedLibrary.messaging.Constants;
import com.eKirana.SharedLibrary.messaging.IMessagePublisher;
import com.eKirana.SharedLibrary.model.authorization.UserCredential;
import com.eKirana.SharedLibrary.model.order.Order;
import com.eKirana.SharedLibrary.model.product.Product;
import com.eKirana.SharedLibrary.security.UserCredentialJWTGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductMessenger {
    private IProductService productService;
    private IMessagePublisher messagePublisher;
    private UserCredential systemCredentials;
    private final Logger logger = LoggerFactory.getLogger(ProductMessenger.class);

    @Autowired
    public ProductMessenger(IProductService orderService, IMessagePublisher messagePublisher, UserCredentialJWTGenerator credentialJWTGenerator) {
        this.productService = orderService;
        this.messagePublisher = messagePublisher;
        this.systemCredentials = credentialJWTGenerator.getSystemCredential();
    }

    @RabbitListener(queues = Constants.ORDER_QUEUE_NAME)
    private void orderQueueListener(Order order){
        List<Product> inventoryUpdated = new ArrayList<>();
        for(Product item : order.getOrderedItems()) {
            try {
                productService.updateProductQuantity(item.getProductId(), -item.getQuantity(), systemCredentials.getUserId());
                inventoryUpdated.add(item);
            } catch (Exception ex) {
                try {
                    logger.error("[orderQueueListener]: Order:[{}] Product:[{}] Error:", order.getOrderId(), item.getProductId(), ex);
                    logger.info("[orderQueueListener]: Reverting [{}] updated inventories", inventoryUpdated.size());
                    for (Product revertItem : inventoryUpdated) {
                        productService.updateProductQuantity(revertItem.getProductId(), revertItem.getQuantity(), systemCredentials.getUserId());
                    }
                } catch (Exception ignored) {
                }
                messagePublisher.publishFailedOrder(order);
            }
        }
        logger.info("[orderQueueListener]: Inventory verified Order:[{}]", order.getOrderId());
    }
}
