package com.ssafy.pjt.interceptor;

//import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

//import com.ssafy.pjt.util.JwtUtil;

//import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.MalformedJwtException;
//import io.jsonwebtoken.SignatureException;
//import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtInterceptor implements HandlerInterceptor{
    private static final String HEADER_AUTH = "access-token";
    // 요청이 왔을 때
    // 요청을 가로채서 토큰을 검사
    	// => 요청의 헤더에 제대로된 토큰을 가지고 있다면 통과 => return true;
    	// => 토큰이 없다면 요청을 막아버림 => return false;
    	// => 요청 헤더 토큰을 가지고는 있는데 토큰이 유효하지 않다면(유효기간이 지났다거나, 서명이 잘못되었다거나...) => return false
//    @Autowired
//    private JwtUtil jwtUtil;
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){
        if(request.getMethod().equals("OPTIONS")) return true;
       
        String token = request.getHeader(HEADER_AUTH);

        // 토큰이 없다면
        if(token == null) return false;
        if(token != null) {
        	// 토큰의 유효성 검사 => 예외발생시킬 수 있는 코드 => 예외처리를 해줘야 함
        	// 토큰이 유효하지 않은 경우 예외 발생
        	try {
				Jwts.parser().setSigningKey("SERVER_SECRET_KEY".getBytes("UTF-8")).parseClaimsJws(token);
			} catch (Exception e) {
				e.printStackTrace();
				// 예외가 발생 => 유효하지 않은 토큰
				return false;
			}
        }
        // 토큰도 있고, 토큰이 유효하다면 
        return true;
    }
}