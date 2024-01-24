package com.eKirana.AuthenticationService.config;

import com.eKirana.SharedLibrary.security.JwtFilter;
import com.eKirana.SharedLibrary.security.SecurityTokenGenerator;
import com.eKirana.SharedLibrary.security.UserCredentialJWTGenerator;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {
    @Bean
    public FilterRegistrationBean<?> jwtFilterBean(){
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtFilter());
        filterRegistrationBean.addUrlPatterns("/api/auth/updatePassword");
        return filterRegistrationBean;
    }

    @Bean
    public SecurityTokenGenerator securityTokenGeneratorBean(){
        return new UserCredentialJWTGenerator();
    }
}
