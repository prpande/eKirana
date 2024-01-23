package com.bej.SpringCloudAPIGateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class APIGatewayConfiguration {

    @Bean
    public RouteLocator setupRoutes(RouteLocatorBuilder builder){
        return builder.routes()
                .route(predicateSpec -> predicateSpec
                        .path("/api/auth/**")
                        .uri("lb://ekirana-authentication-service"))

                .route(predicateSpec -> predicateSpec
                        .path("/api/order/**")
                        .uri("lb://ekirana-order-service"))

                .route(predicateSpec -> predicateSpec
                        .path("/api/user/**")
                        .uri("lb://ekirana-user-service"))

                .route(predicateSpec -> predicateSpec
                        .path("/api/product/**")
                        .uri("lb://ekirana-product-service"))
                .build();
    }
}
