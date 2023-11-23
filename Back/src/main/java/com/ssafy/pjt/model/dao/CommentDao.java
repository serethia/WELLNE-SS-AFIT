package com.ssafy.pjt.model.dao;

import java.util.List;
import java.util.Map;

import com.ssafy.pjt.model.dto.Comment;

public interface CommentDao {
	
	//댓글 목록 보기
	List<Comment> selectAllComments(Map<String, Object> map);

	//댓글 등록
	int insertComment(Comment comment);
	
	//댓글 수정
	int updateComment(Comment comment);

	//댓글 삭제
	int deleteComment(int commentId);
	
	//좋아요 수
	int getCommentLikes(int commentId);
	
	//싫어요 수
	int getCommentDislikes(int commentId);
	
	//댓글 좋아요 +/-
	int plusCommentLikes(Map<String,Object> map);
	int minusCommentLikes(Map<String,Object> map);
	
	//댓글 싫어요 +/-
	int plusCommentDislikes(Map<String,Object> map);
	int minusCommentDislikes(Map<String,Object> map);
}
