package com.ssafy.pjt.controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.pjt.model.dto.User;
import com.ssafy.pjt.model.service.UserService;

@RequestMapping("/userapi")
@RestController
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserService uService;
	
	@GetMapping("user")
	public List<User> getList(){
		List<User> list = uService.getAllUsers();
		return list;
	}
	
	// @RequestBody가 있으면 JSON 데이터가 들어오는 것
	// 없으면 Form데이터가 들어오는 것
	
	@PostMapping("user")
	public String signUp(@RequestBody User user) {
		int result = uService.saveUser(user);
		if(result == 0) {
			return "fail";
		} else {
			return "success";
		}
	}
	
	@PostMapping("login")
	public String login(@RequestBody User user) {
		User loginUser = uService.getUserById(user.getUserId());
		if(loginUser != null && loginUser.getUserPwd().equals(user.getUserPwd())) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	@PostMapping("logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "success";
	}
	
}
