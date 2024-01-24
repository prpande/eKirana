package com.eKirana.UserService.repository;

import com.eKirana.SharedLibrary.model.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}
