package com.eKirana.SharedLibrary.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.Map;

import static com.eKirana.SharedLibrary.security.Constants.ENCRYPTION_KEY;

public class JwtFactory {

    public static String generateJwt(Map<String,Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256, ENCRYPTION_KEY)
                .compact();
    }
}
