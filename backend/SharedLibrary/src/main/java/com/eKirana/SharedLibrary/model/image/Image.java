package com.eKirana.SharedLibrary.model.image;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Image {
    @Id
    private String imageId;
    private String userId;
    private String imageData;
    private String name;

    public Image() {
    }

    public Image(String imageId, String userId, String imageData, String name) {
        this.imageId = imageId;
        this.userId = userId;
        this.imageData = imageData;
        this.name = name;
    }

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getImageData() {
        return imageData;
    }

    public void setImageData(String imageData) {
        this.imageData = imageData;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Image{" +
                "imageId='" + imageId + '\'' +
                ", userId='" + userId + '\'' +
                ", imageData='" + imageData + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
