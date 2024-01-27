package com.eKirana.UserService.messaging;

import com.eKirana.SharedLibrary.messaging.Constants;
import com.eKirana.SharedLibrary.messaging.model.Alert;
import com.eKirana.SharedLibrary.messaging.model.AlertQMessage;
import com.eKirana.SharedLibrary.model.user.User;
import com.eKirana.SharedLibrary.model.user.UserType;
import com.eKirana.SharedLibrary.model.user.Vehicle;
import com.eKirana.UserService.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
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
            User user = userService.getUserById(alertQMessage.getUserId());
            List<Alert> alertList = user.getAlertList();
            if(alertList == null){
                alertList = new ArrayList<>();
            }

            alertList.add(alertQMessage.getAlert());
            User updatedUser = new User();
            updatedUser.setAlertList(alertList);
            if(user.getUserType() == UserType.CARRIER){
                Vehicle userVehicle = updatedUser.getVehicleInfo();
                if( userVehicle == null){
                    userVehicle = new Vehicle();
                }

                userVehicle.setDelivering(true);
                updatedUser.setVehicleInfo(userVehicle);
            }
            userService.updateUser(alertQMessage.getUserId(), updatedUser);
        } catch (Exception ex){
            logger.error("[alertQueueListener]: Failed adding Alert:[{}] for User[{}]", alertQMessage.getAlert().getAlertId(), alertQMessage.getUserId(), ex);
        }
    }
}
