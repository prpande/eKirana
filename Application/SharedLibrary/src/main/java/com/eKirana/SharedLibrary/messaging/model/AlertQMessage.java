package com.eKirana.SharedLibrary.messaging.model;

import java.io.Serializable;

public class AlertQMessage  implements Serializable {
    private String userId;
    private Alert alert;

    public AlertQMessage() {
    }

    public AlertQMessage(String userId, Alert alert) {
        this.userId = userId;
        this.alert = alert;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Alert getAlert() {
        return alert;
    }

    public void setAlert(Alert alert) {
        this.alert = alert;
    }

    @Override
    public String toString() {
        return "AlertQMessage{" +
                "userId='" + userId + '\'' +
                ", alert=" + alert +
                '}';
    }
}
