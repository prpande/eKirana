package com.eKirana.SharedLibrary.security;

import com.eKirana.SharedLibrary.model.authorization.UserCredential;

public class Constants {
    public static final String JWT_ENCRYPTION_KEY = "UserKey";

    public static final String AUTHORIZATION_HEADER_STRING = "Authorization";
    public static final String AUTH_HEADER_PREFIX = "Bearer ";

    public static final String CLAIMS_ATTRIBUTE_STRING = "claims";

    public static final String USERID_CLAIMS_KEY = "userId";
    public static final String USERTYPE_CLAIMS_KEY = "userType";

    public static final String SYSTEM_USER_ID = "1cee9bc9-502d-4fdc-ad0b-960636546fce";
}
