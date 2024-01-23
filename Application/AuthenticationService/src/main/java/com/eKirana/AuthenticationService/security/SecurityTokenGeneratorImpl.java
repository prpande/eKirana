package com.eKirana.AuthenticationService.security;

import com.eKirana.SharedLibrary.model.authorization.UserCredential;
import com.eKirana.SharedLibrary.security.JwtFactory;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SecurityTokenGeneratorImpl implements SecurityTokenGenerator{
    public String createToken(@NotNull UserCredential userCredential){
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userCredential.getUserId());
        claims.put("userType", userCredential.getUserType());

        return JwtFactory.generateJwt(claims, userCredential.getUserId());
    }
}
