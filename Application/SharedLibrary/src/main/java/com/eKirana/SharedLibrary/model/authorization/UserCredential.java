package com.eKirana.SharedLibrary.model.authorization;

import com.eKirana.SharedLibrary.model.user.UserType;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

@Document
public class UserCredential {
    @Id
    private String userId;

    private String password;

    private UserType userType;

    public UserCredential() {
    }

    public UserCredential(String userId, String password, UserType userType) {
        this.userId = userId;
        this.password = password;
        this.userType = userType;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    @Override
    public String toString() {
        return "UserCredential{" +
                "userId='" + userId + '\'' +
                ", password='" + password + '\'' +
                ", userType='" + userType + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserCredential that = (UserCredential) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(password, that.password) &&
                userType == that.userType;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, password, userType);
    }
}
