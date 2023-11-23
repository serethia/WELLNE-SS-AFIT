package com.ssafy.pjt.model.dao;

import java.util.List;

import com.ssafy.pjt.model.dto.SearchCondition;
import com.ssafy.pjt.model.dto.User;

public interface UserDao {
	//회원 목록 보기
	List<User> selectAllUsers();
	
	//회원 이름 검색 결과 보기
	List<User> searchByName(String name);

	//회원 검색 결과 보기
	List<User> searchByCondition(SearchCondition con);
	
	//회원 등록
	int insertUser(User user);
	
	//회원 삭제
	int deleteUser(String userId);
	
	//회원 수정
	int updateUser(User user);
	
	//회원 id
	User selectById(String userId);
}
