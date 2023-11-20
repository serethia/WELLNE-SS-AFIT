package com.ssafy.pjt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.pjt.model.dto.Comment;
import com.ssafy.pjt.model.service.CommentService;

@RequestMapping("/commentapi")
@RestController
@CrossOrigin("*")
public class CommentRestController {
	@Autowired
	private CommentService cService;
	
	@GetMapping("/article/{articleId}")
	public List<Comment> getComment(@PathVariable int articleId){
		List<Comment> list = cService.showAllComments(articleId);
		
	// 옛날 페이지네이션 코드...	
//		int currentPage = 1;
//		int totalItemCount = 23;
//		Pagination pn = new Pagination();
//		pn.setCurrentPage(currentPage); // 현재 페이지 번호
//		pn.setTotalItemCount(totalItemCount); // 총 아이템(글) 갯수
//		model.addAttribute("pn", pn);
		
		return list;
	}
	
	@PostMapping("/article/{articleId}/comments")
	public int write(@RequestBody Comment comment, @PathVariable int articleId) {
		comment.setArticleId(articleId);
		int result = cService.writeComment(comment);
		return result;
	}
	
	@PutMapping("/article/{articleId}/comments/{commentId}")
	public int update(@RequestBody Comment comment, @PathVariable int articleId, @PathVariable int commentId) {
		comment.setArticleId(articleId);
		comment.setCommentId(commentId);
		int result = cService.modifyComment(comment);
		return result;
	}
	
	@DeleteMapping("/article/{articleId}/comments/{commentId}")
	public int delete(@PathVariable int articleId, @PathVariable int commentId) {
		int result = cService.eraseComment(commentId);
		return result;
	}
	
	@GetMapping("/article/{articleId}/comments/{commentId}/likes")
	public int showLike(@PathVariable int articleId, @PathVariable int commentId) {
		int result = cService.showCommentLikes(commentId);
		return result;
	}
	
	@GetMapping("/article/{articleId}/comments/{commentId}/dislikes")
	public int showDislike(@PathVariable int articleId, @PathVariable int commentId) {
		int result = cService.showCommentDislikes(commentId);
		return result;
	}
	
	@GetMapping("/article/{articleId}/comments/{commentId}/pluslike")
	public int increaseLike(@PathVariable int articleId, @PathVariable int commentId, @RequestParam String userId) {
		System.out.println(userId);
		System.out.println(commentId);
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("commentId", commentId);
		int result = cService.increaseCommentLikes(map);
		return result;
	}
	
	@GetMapping("/article/{articleId}/comments/{commentId}/minuslike")
	public int decreaseLike(@PathVariable int articleId, @PathVariable int commentId) {
		int result = cService.decreaseCommentLikes(commentId);
		return result;
	}
	
	@PutMapping("/article/{articleId}/comments/{commentId}/plusdislike")
	public int increaseDisLike(@PathVariable int articleId, @PathVariable int commentId) {
		int result = cService.increaseCommentDislikes(commentId);
		return result;
	}
	
	@PutMapping("/article/{articleId}/comments/{commentId}/minusdislike")
	public int decreaseDisLike(@PathVariable int articleId, @PathVariable int commentId) {
		int result = cService.decreaseCommentDislikes(commentId);
		return result;
	}
	
}
