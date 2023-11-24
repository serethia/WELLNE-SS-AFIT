package com.ssafy.pjt;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.ComponentScan;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
//@ComponentScan(basePackages = "com.ssafy.pjt")
@MapperScan(basePackages = "com.ssafy.pjt.model.dao")
@EnableSwagger2
public class SsafYpjtApplication {

	public static void main(String[] args) {
		SpringApplication.run(SsafYpjtApplication.class, args);
	}

}
