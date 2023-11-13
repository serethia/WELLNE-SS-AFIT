package com.ssafy.pjt.model.service;

import java.util.List;

import com.ssafy.pjt.model.dto.User;

public interface UserService {
	List<User> getAllUsers();
	
	int saveUser(User user);
	
	User getUserById(String userId);
	
}
