package com.eKirana.AuthenticationService.repository;

import com.eKirana.SharedLibrary.model.authorization.UserCredential;
import com.eKirana.SharedLibrary.model.user.UserType;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserCredentialRepository extends MongoRepository<UserCredential, String> {
    UserCredential findByUserIdAndPasswordAndUserType(String userId, String password, UserType userType);
}
