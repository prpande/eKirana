package com.eKirana.ImageService.service;

import com.eKirana.SharedLibrary.model.image.Image;
import com.eKirana.SharedLibrary.model.image.exception.ImageAlreadyExistsException;
import com.eKirana.SharedLibrary.model.image.exception.ImageNotFoundException;
import com.eKirana.SharedLibrary.security.exception.UserIsNotOwnerException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IImageService {

    String saveImage(Image img, String userId) throws IOException, ImageAlreadyExistsException;
    Image getImageById(String imageId) throws ImageNotFoundException;
    List<Image> getImageByUserId(String userId);
    boolean deleteImage(String imageId, String userId) throws ImageNotFoundException, UserIsNotOwnerException;
}
