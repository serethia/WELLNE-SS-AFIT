package com.ssafy.pjt.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.pjt.model.dao.UserDao;
import com.ssafy.pjt.model.dto.User;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserDao dao;

	@Override
	public List<User> getAllUsers() {
		return dao.selectAllUsers();
	}

	@Override
	public int saveUser(User user) {
		return dao.insertUser(user);
	}

	@Override
	public User getUserById(String userId) {
		return dao.selectById(userId);
	}
	
	

}
