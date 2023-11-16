package com.ssafy.pjt.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ssafy.pjt.interceptor.JwtInterceptor;

@Configuration
@EnableWebMvc
public class WebConfig implements WebMvcConfigurer {
	
	@Autowired
	private JwtInterceptor jwtInterceptor;
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");

		registry.addResourceHandler("/swagger-ui/**")
				.addResourceLocations("classpath:/META-INF/resources/webjars/springfox-swagger-ui/");

	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("*").allowedMethods("POST", "GET", "PUT", "DELETE");
	
	}
	
	//현재
	// GET /user
	// GET /user/{id}
	// GET /user/login
	// POST /user
	// PUT /user
	
	// POST /signup => 회원가입
	// POST /login => 로그인
	// GET  /user
	// GET  /user/{id}
	
	
	
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		
		registry.addInterceptor(jwtInterceptor).addPathPatterns("/**").excludePathPatterns("/userapi/login",
               "/userapi/signup", "/swagger-resources/**", "/swagger-ui/**", "/v2/api-docs");
	}
	

}
