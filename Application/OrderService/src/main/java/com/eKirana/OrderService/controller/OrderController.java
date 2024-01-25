package com.eKirana.OrderService.controller;

import com.eKirana.OrderService.exception.OrderAlreadyExistsException;
import com.eKirana.OrderService.exception.OrderNotFoundException;
import com.eKirana.OrderService.service.IOrderService;
import com.eKirana.SharedLibrary.model.order.Order;
import com.eKirana.SharedLibrary.model.order.OrderStatus;
import com.eKirana.SharedLibrary.model.user.User;
import com.eKirana.SharedLibrary.model.user.UserType;
import com.eKirana.SharedLibrary.security.JwtFilter;
import com.eKirana.SharedLibrary.security.UnauthorizedUserTypeException;
import com.eKirana.SharedLibrary.utilities.CommonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;

import static com.eKirana.SharedLibrary.RestEndpoints.*;

@RestController
@RequestMapping(ORDER_ROOT)
public class OrderController {
    private final IOrderService orderService;
    private ResponseEntity<?> responseEntity;
    private final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    public OrderController(IOrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping(PLACE_ORDER)
    public ResponseEntity<?> placeOrder(@RequestBody Order order) throws OrderAlreadyExistsException {
        try {
            logger.info("[placeOrder]: " + order.getOrderId());
        } catch (Exception ex) {
            logger.error("[placeOrder]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }
        return responseEntity;
    }

    @GetMapping(GET_ALL_ORDERS_BY_USER_ID)
    public ResponseEntity<?> getAllOrdersByUserId(@PathVariable String userId, HttpServletRequest httpServletRequest) throws UnauthorizedUserTypeException {
        try {
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            logger.info("[getAllOrdersByUserId]: " + userId);
            responseEntity = new ResponseEntity<>(orderService.getAllOrdersByUserId(userId, userType), HttpStatus.OK);
        } catch (UnauthorizedUserTypeException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[getAllOrdersByUserId]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }
        return responseEntity;
    }


    @GetMapping(GET_ALL_ORDERS)
    public ResponseEntity<?> getAllOrders() {
        try {
            logger.info("[getAllOrders]: Enter");
            responseEntity = new ResponseEntity<>(orderService.getAllOrders(), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[getAllOrders]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }
        return responseEntity;
    }

    @GetMapping(GET_ORDER_BY_ID)
    public ResponseEntity<?> getOrderById(@PathVariable String orderId) throws OrderNotFoundException {
        try {
            logger.info("[getOrderById]: " + orderId);
            responseEntity = new ResponseEntity<>(orderService.getOrderById(orderId), HttpStatus.OK);
        } catch (OrderNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[getOrderById]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }
        return responseEntity;
    }

    @DeleteMapping(CANCEL_ORDER)
    public ResponseEntity<?> cancelOrder(@PathVariable String orderId) throws OrderNotFoundException {
        try {
            logger.info("[cancelOrder]: " + orderId);
            responseEntity = new ResponseEntity<>(orderService.cancelOrder(orderId), HttpStatus.ACCEPTED);
        } catch (OrderNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[cancelOrder]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }
        return responseEntity;
    }

    @PutMapping(UPDATE_ORDER_STATUS)
    public ResponseEntity<?> updateOrderStatus(@PathVariable String orderId, @RequestBody OrderStatus newStatus) throws OrderNotFoundException {
        try {
            logger.info("[updateOrderStatus]: " + orderId);
            responseEntity = new ResponseEntity<>(orderService.updateOrderStatus(orderId, newStatus), HttpStatus.OK);
        } catch (OrderNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[updateOrderStatus]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }
        return responseEntity;
    }

    @PutMapping(UPDATE_ORDER_CARRIER)
    public ResponseEntity<?> updateOrderCarrier(@PathVariable String orderId, @RequestBody User newCarrierInfo) throws OrderNotFoundException {
        try {
            logger.info("[updateOrderCarrier]: " + orderId);
            responseEntity = new ResponseEntity<>(orderService.updateOrderCarrier(orderId, newCarrierInfo), HttpStatus.OK);
        } catch (OrderNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[updateOrderCarrier]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }
        return responseEntity;
    }

    @PutMapping(UPDATE_ORDER_COMMENTS)
    public ResponseEntity<?> updateOrderComments(@PathVariable String orderId, @RequestBody String newComments) throws OrderNotFoundException {
        try {
            logger.info("[updateOrderComments]: " + orderId);
            responseEntity = new ResponseEntity<>(orderService.updateOrderComments(orderId, newComments), HttpStatus.OK);
        } catch (OrderNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[updateOrderComments]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }
        return responseEntity;
    }

    @PutMapping(UPDATE_ORDER_DELIVERY_DATE)
    public ResponseEntity<?> updateOrderDeliveryDate(@PathVariable String orderId, @RequestBody Date newDeliveredOn) throws OrderNotFoundException {
        try {
            logger.info("[updateOrderDeliveryDate]: " + orderId);
            responseEntity = new ResponseEntity<>(orderService.updateOrderDeliveryDate(orderId, newDeliveredOn), HttpStatus.OK);
        } catch (OrderNotFoundException ex) {
            throw ex;
        } catch (Exception ex) {
            logger.error("[updateOrderDeliveryDate]: Error", ex);
            responseEntity = CommonUtils.get500ResponseEntity(ex);
        }
        return responseEntity;
    }
}
