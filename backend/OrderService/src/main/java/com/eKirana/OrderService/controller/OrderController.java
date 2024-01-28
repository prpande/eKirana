package com.eKirana.OrderService.controller;

import com.eKirana.OrderService.service.IOrderService;
import com.eKirana.SharedLibrary.model.order.Order;
import com.eKirana.SharedLibrary.model.order.OrderStatus;
import com.eKirana.SharedLibrary.model.order.exception.OrderAlreadyExistsException;
import com.eKirana.SharedLibrary.model.order.exception.OrderNotFoundException;
import com.eKirana.SharedLibrary.model.user.UserType;
import com.eKirana.SharedLibrary.security.JwtFilter;
import com.eKirana.SharedLibrary.security.exception.UnauthorizedUserTypeException;
import com.eKirana.SharedLibrary.security.exception.UserIsNotOwnerException;
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
    public ResponseEntity<?> placeOrder(@RequestBody Order order, HttpServletRequest httpServletRequest) throws OrderAlreadyExistsException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            logger.info("[placeOrder]: User:[{}] Order:[{}]", userId, order.getOrderId());
            responseEntity = new ResponseEntity<>(orderService.placeOrder(order, userId), HttpStatus.CREATED);
        } catch (Exception ex) {
            logger.error("[placeOrder]: Error", ex);
            throw ex;
        }
        return responseEntity;
    }

    @GetMapping(GET_ALL_ORDERS_BY_USER_ID)
    public ResponseEntity<?> getAllOrdersByUserId(@PathVariable String userId, HttpServletRequest httpServletRequest) throws UnauthorizedUserTypeException {
        try {
            logger.info("[getAllOrdersByUserId]: " + userId);
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            responseEntity = new ResponseEntity<>(orderService.getAllOrdersByUserId(userId, userType), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[getAllOrdersByUserId]: Error", ex);
            throw ex;
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
            throw ex;
        }
        return responseEntity;
    }

    @GetMapping(GET_ORDERS_AVAILABLE_FOR_DELIVERY)
    public ResponseEntity<?> getOrdersAvailableForDelivery(HttpServletRequest httpServletRequest) throws UnauthorizedUserTypeException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            logger.info("[getOrdersAvailableForDelivery]: User:[{}] UserType:[{}]", userId, userType);
            responseEntity = new ResponseEntity<>(orderService.getOrdersAvailableForDelivery(userType), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[getOrdersAvailableForDelivery]: Error", ex);
            throw ex;
        }
        return responseEntity;
    }

    @GetMapping(GET_ORDER_BY_ID)
    public ResponseEntity<?> getOrderById(@PathVariable String orderId, HttpServletRequest httpServletRequest) throws OrderNotFoundException, UserIsNotOwnerException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            logger.info("[getOrderById]: User:[{}] Order:[{}]", userId, orderId);
            responseEntity = new ResponseEntity<>(orderService.getOrderById(orderId, userId), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[getOrderById]: Error", ex);
            throw ex;
        }
        return responseEntity;
    }

    @DeleteMapping(CANCEL_ORDER)
    public ResponseEntity<?> cancelOrder(@PathVariable String orderId, HttpServletRequest httpServletRequest) throws OrderNotFoundException, UserIsNotOwnerException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            logger.info("[cancelOrder]: User:[{}] Order:[{}]", userId, orderId);
            responseEntity = new ResponseEntity<>(orderService.cancelOrder(orderId, userId), HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            logger.error("[cancelOrder]: Error", ex);
            throw ex;
        }
        return responseEntity;
    }

    @PutMapping(UPDATE_ORDER_STATUS)
    public ResponseEntity<?> updateOrderStatus(@PathVariable String orderId, @RequestBody OrderStatus newStatus, HttpServletRequest httpServletRequest) throws OrderNotFoundException, UserIsNotOwnerException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            logger.info("[updateOrderStatus]: User:[{}] Order:[{}]", userId, orderId);
            responseEntity = new ResponseEntity<>(orderService.updateOrderStatus(orderId, newStatus, userId), HttpStatus.OK);
            return responseEntity;
        } catch (Exception ex) {
            logger.error("[updateOrderStatus]: Error", ex);
            throw ex;
        }
    }

    @PutMapping(UPDATE_ORDER_CARRIER)
    public ResponseEntity<?> updateOrderCarrier(@PathVariable String orderId, HttpServletRequest httpServletRequest) throws OrderNotFoundException, UnauthorizedUserTypeException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            logger.info("[updateOrderCarrier]: User:[{}] Order:[{}]", userId, orderId);
            responseEntity = new ResponseEntity<>(orderService.updateOrderCarrier(orderId, userId, userType), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[updateOrderCarrier]: Error", ex);
            throw ex;
        }
        return responseEntity;
    }

    @PutMapping(UPDATE_ORDER_COMMENTS)
    public ResponseEntity<?> updateOrderComments(@PathVariable String orderId, @RequestBody String newComments, HttpServletRequest httpServletRequest) throws OrderNotFoundException, UserIsNotOwnerException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            logger.info("[updateOrderComments]: User:[{}] Order:[{}]", userId, orderId);
            responseEntity = new ResponseEntity<>(orderService.updateOrderComments(orderId, newComments, userId), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[updateOrderComments]: Error", ex);
            throw ex;
        }
        return responseEntity;
    }

    @PutMapping(UPDATE_ORDER_DELIVERY_DATE)
    public ResponseEntity<?> updateOrderDeliveryDate(@PathVariable String orderId, @RequestBody Date newDeliveredOn, HttpServletRequest httpServletRequest) throws OrderNotFoundException, UserIsNotOwnerException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            logger.info("[updateOrderDeliveryDate]: User:[{}] Order:[{}]", userId, orderId);
            responseEntity = new ResponseEntity<>(orderService.updateOrderDeliveryDate(orderId, newDeliveredOn, userId), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[updateOrderDeliveryDate]: Error", ex);
            throw ex;
        }
        return responseEntity;
    }
}
