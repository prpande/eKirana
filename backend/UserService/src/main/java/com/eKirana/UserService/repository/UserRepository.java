package com.eKirana.UserService.repository;

import com.eKirana.SharedLibrary.model.user.User;
import com.eKirana.SharedLibrary.model.user.UserType;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByUserType(UserType userType);
}
