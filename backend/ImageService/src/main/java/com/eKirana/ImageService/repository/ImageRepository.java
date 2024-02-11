package com.eKirana.ImageService.repository;

import com.eKirana.SharedLibrary.model.image.Image;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ImageRepository extends MongoRepository<Image, String> {
    List<Image> findByUserId(String userId);
}
