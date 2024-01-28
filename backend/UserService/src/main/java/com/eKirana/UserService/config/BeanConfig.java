package com.eKirana.UserService.config;

import com.eKirana.SharedLibrary.RestEndpoints;
import com.eKirana.SharedLibrary.security.JwtFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfig {
    @Bean
    public FilterRegistrationBean<?> jwtFilterBean(){
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtFilter());
        filterRegistrationBean.addUrlPatterns(RestEndpoints.USER_SECURE_PATTERNS);
        return filterRegistrationBean;
    }
}
