package com.ssafy.pjt.model.dao;

import java.util.List;
import java.util.Map;

import com.ssafy.pjt.model.dto.Comment;

public interface CommentDao {
	
	List<Comment> selectAllComments(Map<String, Object> map);

	int insertComment(Comment comment);
	
	int updateComment(Comment comment);

	int deleteComment(int commentId);
	
	int getCommentLikes(int commentId);
	
	int getCommentDislikes(int commentId);
	
	int plusCommentLikes(Map<String,Object> map);
	
	int minusCommentLikes(Map<String,Object> map);
	
	int plusCommentDislikes(Map<String,Object> map);
	
	int minusCommentDislikes(Map<String,Object> map);
}
