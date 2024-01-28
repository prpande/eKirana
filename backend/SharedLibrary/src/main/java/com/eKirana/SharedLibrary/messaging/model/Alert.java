package com.eKirana.SharedLibrary.messaging.model;

import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

public class Alert implements Serializable {
    @Id
    private String alertId;
    private AlertLevel level;
    private String message;
    private Date timeStamp;
    private boolean cleared;

    public Alert() {
    }

    public Alert(String alertId, AlertLevel level, String message, Date timeStamp, boolean cleared) {
        this.alertId = alertId;
        this.level = level;
        this.message = message;
        this.timeStamp = timeStamp;
        this.cleared = cleared;
    }

    public String getAlertId() {
        return alertId;
    }

    public void setAlertId(String alertId) {
        this.alertId = alertId;
    }

    public AlertLevel getLevel() {
        return level;
    }

    public void setLevel(AlertLevel level) {
        this.level = level;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Date timeStamp) {
        this.timeStamp = timeStamp;
    }

    public boolean isCleared() {
        return cleared;
    }

    public void setCleared(boolean cleared) {
        this.cleared = cleared;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Alert alert = (Alert) o;
        return Objects.equals(alertId, alert.alertId) && level == alert.level && Objects.equals(message, alert.message) && Objects.equals(timeStamp, alert.timeStamp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(alertId, level, message, timeStamp);
    }

    @Override
    public String toString() {
        return "Alert{" +
                "alertId='" + alertId + '\'' +
                ", level=" + level +
                ", message='" + message + '\'' +
                ", timeStamp=" + timeStamp +
                ", cleared=" + cleared +
                '}';
    }
}
