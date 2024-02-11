package com.eKirana.ImageService.controller;

import com.eKirana.ImageService.service.IImageService;
import com.eKirana.SharedLibrary.model.image.Image;
import com.eKirana.SharedLibrary.model.image.exception.ImageAlreadyExistsException;
import com.eKirana.SharedLibrary.model.image.exception.ImageNotFoundException;
import com.eKirana.SharedLibrary.model.user.UserType;
import com.eKirana.SharedLibrary.security.JwtFilter;
import com.eKirana.SharedLibrary.security.exception.UserIsNotOwnerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

import static com.eKirana.SharedLibrary.RestEndpoints.*;

@RestController
@RequestMapping(IMAGE_ROOT)
@CrossOrigin("*")
public class ImageController {
    private final IImageService imageService;
    private ResponseEntity<?> responseEntity;
    private final Logger logger = LoggerFactory.getLogger(ImageController.class);

    @Autowired
    public ImageController(IImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping(SAVE_IMAGE)
    public ResponseEntity<?> saveImage(@RequestBody Image img, HttpServletRequest httpServletRequest) throws IOException, ImageAlreadyExistsException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            String imageId = img.getImageId();
            logger.info("[saveImage]: User:[{}] UserType:[{}] Image:[{}]", userId, userType, imageId);
            responseEntity = new ResponseEntity<>(imageService.saveImage(img, userId), HttpStatus.CREATED);
        } catch (Exception ex) {
            logger.error("[saveImage]: Error", ex);
            throw ex;
        }

        return responseEntity;
    }

    @GetMapping(GET_IMAGE_BY_ID)
    public ResponseEntity<?> getImageById(@PathVariable String imageId, HttpServletRequest httpServletRequest) throws ImageNotFoundException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            logger.info("[getImageById]: User:[{}] UserType:[{}] Image:[{}]", userId, userType, imageId);
            responseEntity = new ResponseEntity<>(imageService.getImageById(imageId), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[getImageById]: Error", ex);
            throw ex;
        }

        return responseEntity;
    }

    @GetMapping(GET_IMAGE_BY_USER_ID)
    public ResponseEntity<?> getImageByUserId(@PathVariable String userId, HttpServletRequest httpServletRequest) {
        try {
            String requestingUserId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            logger.info("[getImageBuUserId]: Requesting User:[{}] UserType:[{}] Requested User:[{}]", requestingUserId, userType, userId);
            responseEntity = new ResponseEntity<>(imageService.getImageByUserId(userId), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[getImageBuUserId]: Error", ex);
            throw ex;
        }

        return responseEntity;
    }

    @DeleteMapping(DELETE_IMAGE)
    public ResponseEntity<?> deleteImage(@PathVariable String imageId, HttpServletRequest httpServletRequest) throws ImageNotFoundException, UserIsNotOwnerException {
        try {
            String userId = JwtFilter.getUserIdFromRequest(httpServletRequest);
            UserType userType = JwtFilter.getUserTypeFromRequest(httpServletRequest);
            logger.info("[deleteImage]: User:[{}] UserType:[{}] Image:[{}]", userId, userType, imageId);
            responseEntity = new ResponseEntity<>(imageService.deleteImage(imageId, userId), HttpStatus.OK);
        } catch (Exception ex) {
            logger.error("[deleteImage]: Error", ex);
            throw ex;
        }

        return responseEntity;
    }
}
