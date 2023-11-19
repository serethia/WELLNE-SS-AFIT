package com.ssafy.pjt.model.dao;

import java.util.List;

import com.ssafy.pjt.model.dto.Comment;

public interface CommentDao {
	
	List<Comment> selectAllComments(int articleId);

	int insertComment(Comment comment);
	
	int updateComment(Comment comment);

	int deleteComment(int commentId);
	
	int plusCommentLikes(int commentId);
	
	int minusCommentLikes(int commentId);
	
	int plusCommentDislikes(int commentId);
	
	int minusCommentDislikes(int commentId);
}
