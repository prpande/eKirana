package com.eKirana.SharedLibrary.security;

import com.eKirana.SharedLibrary.model.authorization.UserCredential;

public interface SecurityTokenGenerator {
    String createToken(UserCredential userCredential);
}
