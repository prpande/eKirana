package com.eKirana.ImageService.service;

import com.eKirana.ImageService.repository.ImageRepository;
import com.eKirana.SharedLibrary.model.image.Image;
import com.eKirana.SharedLibrary.model.image.exception.ImageAlreadyExistsException;
import com.eKirana.SharedLibrary.model.image.exception.ImageNotFoundException;
import com.eKirana.SharedLibrary.security.exception.UserIsNotOwnerException;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ImageServiceImpl implements IImageService {

    private ImageRepository imageRepository;

    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    @Override
    public String saveImage(Image img, String userId) throws IOException, ImageAlreadyExistsException {
        if(imageRepository.findById(img.getImageId()).isPresent()){
            throw new ImageAlreadyExistsException();
        }

        img.setUserId(userId);
        Image savedImg = imageRepository.save(img);
        return savedImg.getImageId();
    }

    @Override
    public Image getImageById(String imageId) throws ImageNotFoundException {
        Optional<Image> optImg = imageRepository.findById(imageId);
        if(optImg.isEmpty()){
            throw new ImageNotFoundException();
        }

        return optImg.get();
    }

    @Override
    public List<Image> getImageByUserId(String userId) {
        return imageRepository.findByUserId(userId);
    }

    @Override
    public boolean deleteImage(String imageId, String userId) throws ImageNotFoundException, UserIsNotOwnerException {
        Optional<Image> optImg = imageRepository.findById(imageId);
        if(optImg.isEmpty()){
            throw new ImageNotFoundException();
        }

        Image img = optImg.get();
        if(!img.getUserId().equals(userId)){
            throw new UserIsNotOwnerException();
        }

        imageRepository.deleteById(imageId);
        return true;
    }
}
