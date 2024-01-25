package com.eKirana.SharedLibrary.security;

import com.eKirana.SharedLibrary.model.user.UserType;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.jetbrains.annotations.NotNull;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.eKirana.SharedLibrary.security.Constants.*;


public class JwtFilter extends GenericFilter {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        ServletOutputStream pw = response.getOutputStream();
        String authHeader = request.getHeader(AUTHORIZATION_HEADER_STRING);
        if (request.getMethod().equals("OPTIONS")) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
        } else if (authHeader == null || !authHeader.startsWith(AUTH_HEADER_PREFIX)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            pw.println("Missing or Invalid Token");
        } else {
            String token = authHeader.substring(AUTH_HEADER_PREFIX.length());
            Claims claims = Jwts.parser().setSigningKey(JWT_ENCRYPTION_KEY).parseClaimsJws(token).getBody();
            request.setAttribute(CLAIMS_ATTRIBUTE_STRING, claims);
            filterChain.doFilter(request, response);
        }
    }

    public static Claims getClaims(@NotNull HttpServletRequest request) {
        return (Claims) request.getAttribute(CLAIMS_ATTRIBUTE_STRING);
    }

    public static String getUserIdFromRequest(@NotNull HttpServletRequest request) {
        return getClaims(request).getSubject();
    }

    public static UserType getUserTypeFromRequest(@NotNull HttpServletRequest request) {
        return (UserType) getClaims(request).get(USERTYPE_CLAIMS_KEY);
    }
}
