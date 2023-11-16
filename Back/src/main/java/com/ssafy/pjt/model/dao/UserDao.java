package com.ssafy.pjt.model.dao;

import java.util.List;

import com.ssafy.pjt.model.dto.SearchCondition;
import com.ssafy.pjt.model.dto.User;

public interface UserDao {
	List<User> selectAllUsers();
	
	List<User> searchByName(String name);

	List<User> searchByCondition(SearchCondition con);
	
	int insertUser(User user);
	
	int deleteUser(String userId);
	
	int updateUser(User user);
	
	User selectById(String userId);
}
