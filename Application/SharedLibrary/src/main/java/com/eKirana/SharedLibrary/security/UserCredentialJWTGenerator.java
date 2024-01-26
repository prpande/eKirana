package com.eKirana.SharedLibrary.security;

import com.eKirana.SharedLibrary.model.authorization.UserCredential;
import com.eKirana.SharedLibrary.model.user.UserType;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.eKirana.SharedLibrary.security.Constants.*;

@Component
public class UserCredentialJWTGenerator implements SecurityTokenGenerator {
    public String createToken(@NotNull UserCredential userCredential){
        Map<String, Object> claims = new HashMap<>();
        claims.put(USERID_CLAIMS_KEY, userCredential.getUserId());
        claims.put(USERTYPE_CLAIMS_KEY, userCredential.getUserType());

        return generateJwt(claims, userCredential.getUserId());
    }

    private String generateJwt(Map<String,Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, JWT_ENCRYPTION_KEY)
                .compact();
    }

    public UserCredential getSystemCredential(){
        return new UserCredential(SYSTEM_USER_ID, null, UserType.SYSTEM);
    }
    public String createSystemToken(){
        UserCredential userCredential = getSystemCredential();
        return createToken(userCredential);
    }
}
