package com.eKirana.ImageService.config;

import com.eKirana.SharedLibrary.security.JwtFilter;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import static com.eKirana.SharedLibrary.RestEndpoints.IMAGE_SECURE_PATTERNS;

@Configuration
public class BeanConfig {
    @Bean
    public FilterRegistrationBean<?> jwtFilterBean(){
        FilterRegistrationBean filterRegistrationBean = new FilterRegistrationBean<>();
        filterRegistrationBean.setFilter(new JwtFilter());
        filterRegistrationBean.addUrlPatterns(IMAGE_SECURE_PATTERNS);
        return filterRegistrationBean;
    }
}
