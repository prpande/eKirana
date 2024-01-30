package com.eKirana.AuthenticationService.config;

import com.eKirana.SharedLibrary.security.Constants;
import com.eKirana.SharedLibrary.security.JwtFilter;
import com.eKirana.SharedLibrary.security.SecurityTokenGenerator;
import com.eKirana.SharedLibrary.security.UserCredentialJWTGenerator;
import feign.RequestInterceptor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.eKirana.SharedLibrary.RestEndpoints.AUTHORIZATION_SECURE_PATTERNS;

@Configuration
public class BeanConfig {
    @Bean
    public FilterRegistrationBean<?> jwtFilterBean(){
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtFilter());
        filterRegistrationBean.addUrlPatterns(AUTHORIZATION_SECURE_PATTERNS);
        return filterRegistrationBean;
    }

    @Bean
    public UserCredentialJWTGenerator securityTokenGeneratorBean(){
        return new UserCredentialJWTGenerator();
    }

    @Bean
    public RequestInterceptor bearerAuthRequestInterceptor(UserCredentialJWTGenerator userCredentialJWTGenerator) {
        return requestTemplate -> {
            requestTemplate.header(Constants.AUTHORIZATION_HEADER_STRING, Constants.AUTH_HEADER_PREFIX + userCredentialJWTGenerator.createSystemToken());
        };
    }
}
