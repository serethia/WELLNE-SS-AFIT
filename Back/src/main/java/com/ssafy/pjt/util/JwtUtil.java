package com.ssafy.pjt.util;

import java.io.UnsupportedEncodingException;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
    private static final String SALT = "SSAFIT";
    
    public String createToken(String key, String value) throws UnsupportedEncodingException {
        return Jwts.builder()
                .setHeaderParam("alg", "HS256")
                .setHeaderParam("typ", "JWT") 
                .claim(key, value)
                .signWith(SignatureAlgorithm.HS256, SALT.getBytes("UTF-8"))
                .compact();
    }
    
    public void valid(String token) throws Exception {
        Jwts.parser().setSigningKey(SALT.getBytes("UTF-8")).parseClaimsJws(token);
    }
}