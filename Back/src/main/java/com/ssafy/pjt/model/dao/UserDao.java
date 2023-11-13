package com.ssafy.pjt.model.dao;

import java.util.List;

import com.ssafy.pjt.model.dto.User;

public interface UserDao {
	List<User> selectAllUsers();
	
	int insertUser(User user);
	
	User selectById(String userId);
}
