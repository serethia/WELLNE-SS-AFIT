package com.ssafy.pjt.model.service;

import java.util.List;

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
	
}
