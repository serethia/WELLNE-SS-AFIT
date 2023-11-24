package com.ssafy.pjt.model.service;

import java.util.List;

import com.ssafy.pjt.model.dto.SearchCondition;
import com.ssafy.pjt.model.dto.User;

public interface UserService {
	List<User> getAllUsers();
	
	List<User> getByName(String name);
	
	List<User> getByCondition(SearchCondition con);
	
	int saveUser(User user);
	
	int removeUser(String userId);
	
	int modifyUser(User user);	
	
	User getUserById(String userId);
	
}
