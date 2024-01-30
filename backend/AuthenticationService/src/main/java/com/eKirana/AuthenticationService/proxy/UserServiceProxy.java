package com.eKirana.AuthenticationService.proxy;

import com.eKirana.AuthenticationService.config.BeanConfig;
import com.eKirana.SharedLibrary.model.user.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import static com.eKirana.SharedLibrary.RestEndpoints.CREATE_USER;
import static com.eKirana.SharedLibrary.RestEndpoints.USER_ROOT;

@FeignClient(name="ekirana-user-service",url="localhost:8082", configuration = BeanConfig.class)
public interface UserServiceProxy {
    @PostMapping(USER_ROOT + CREATE_USER)
    ResponseEntity<?> createUser(@RequestBody User userInfo);
}
