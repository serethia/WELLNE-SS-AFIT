package com.ssafy.pjt.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.pjt.model.dto.Comment;

public interface CommentService {
     // 댓글 목록 보기
	 List<Comment> showAllComments(int articleId);

	 // 댓글 등록
	 int writeComment(Comment comment);
	 
	 // 댓글 수정
	 int modifyComment(Comment comment);
		
	 // 댓글 삭제
	 int eraseComment(int commentId);
	 
	 // 좋아요 수
	 int showCommentLikes(int commentId);
	 
	 // 싫어요 수
	 int showCommentDislikes(int commentId);
	 
	 // 댓글 좋아요 +/-
	 int increaseCommentLikes(Map<String, Object> map);
	 int decreaseCommentLikes(Map<String,Object> map);
	 
	 // 댓글 싫어요 +/-
	 int increaseCommentDislikes(Map<String,Object> map);
	 int decreaseCommentDislikes(Map<String,Object> map);
	 
}
