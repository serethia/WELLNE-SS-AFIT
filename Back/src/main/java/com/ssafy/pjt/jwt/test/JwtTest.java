package com.ssafy.pjt.jwt.test;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class JwtTest {
	public static void main(String[] args) throws UnsupportedEncodingException {
		String token = Jwts.builder()
				.claim("id", "news55")
				.setExpiration(new Date(System.currentTimeMillis() + 1000*60))
				.signWith(SignatureAlgorithm.HS256, "SERVER_SECRET_KEY".getBytes("UTF-8"))
				.compact();
		
		System.out.println(token);
	}
}
