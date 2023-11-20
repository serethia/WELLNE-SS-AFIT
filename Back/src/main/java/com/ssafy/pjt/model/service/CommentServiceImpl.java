package com.ssafy.pjt.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.pjt.model.dao.CommentDao;
import com.ssafy.pjt.model.dto.Comment;

@Service
public class CommentServiceImpl implements CommentService {
	
	@Autowired
	private CommentDao cDao;

	@Override
	public List<Comment> showAllComments(int articleId) {
		return cDao.selectAllComments(articleId);
	}

	@Override
	public int writeComment(Comment comment) {
		return cDao.insertComment(comment);
	}

	@Override
	public int modifyComment(Comment comment) {
		return cDao.updateComment(comment);
	}

	@Override
	public int eraseComment(int commentId) {
		return cDao.deleteComment(commentId);
	}
	
	@Override
	public int showCommentLikes(int commentId) {
		return cDao.getCommentLikes(commentId);
	}

	@Override
	public int showCommentDislikes(int commentId) {
		return cDao.getCommentDislikes(commentId);
	}

	@Override
	public int increaseCommentLikes(Map<String, Object> map) {
		return cDao.plusCommentLikes(map);
	}

	@Override
	public int decreaseCommentLikes(Map<String,Object> map) {
		return cDao.minusCommentLikes(map);
	}

	@Override
	public int increaseCommentDislikes(Map<String,Object> map) {
		return cDao.plusCommentDislikes(map);
	}

	@Override
	public int decreaseCommentDislikes(Map<String,Object> map) {
		return cDao.minusCommentDislikes(map);
	}

}
