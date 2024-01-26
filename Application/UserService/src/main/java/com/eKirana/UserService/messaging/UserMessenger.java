package com.eKirana.UserService.messaging;

import com.eKirana.SharedLibrary.messaging.Constants;
import com.eKirana.SharedLibrary.messaging.model.Alert;
import com.eKirana.SharedLibrary.messaging.model.AlertQMessage;
import com.eKirana.SharedLibrary.model.user.User;
import com.eKirana.UserService.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserMessenger {
    private final IUserService userService;
    private final Logger logger = LoggerFactory.getLogger(UserMessenger.class);

    @Autowired
    public UserMessenger(IUserService userService) {
        this.userService = userService;
    }

    @RabbitListener(queues = Constants.ALERT_QUEUE_NAME)
    private void alertQueueListener(AlertQMessage alertQMessage){
        try {
            List<Alert> alertList = userService.getUserById(alertQMessage.getUserId()).getAlertList();
            alertList.add(alertQMessage.getAlert());
            User addUser = new User();
            addUser.setAlertList(alertList);
            userService.updateUser(alertQMessage.getUserId(), addUser);
        } catch (Exception ex){
            logger.error("[alertQueueListener]: Failed adding Alert:[{}] for User[{}]", alertQMessage.getAlert().getAlertId(), alertQMessage.getUserId(), ex);
        }
    }
}
