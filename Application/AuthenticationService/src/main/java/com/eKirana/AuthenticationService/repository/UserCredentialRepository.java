package com.eKirana.AuthenticationService.repository;

import com.eKirana.SharedLibrary.model.authorization.UserCredential;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserCredentialRepository extends MongoRepository<UserCredential, String> {
    UserCredential findByUserIdAndPassword(String userId, String password);
}
