package com.ssafy.pjt.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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
import com.ssafy.pjt.util.JwtUtil;

import io.jsonwebtoken.Jwts;

@RequestMapping("/commentapi")
@RestController
@CrossOrigin("*")
public class CommentRestController {
	// 추가함
	private static final String SALT = "SSAFIT";
	@Autowired
	private JwtUtil jwtUtil; 
	private String getUserId(String token) {
		try {
			return Jwts.parser().setSigningKey(SALT.getBytes("UTF-8")).parseClaimsJws(token).getBody().getSubject();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Autowired
	private CommentService cService;
	
	@GetMapping("/article/{articleId}")
	public List<Comment> getComment(@PathVariable int articleId, @RequestParam String userId){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("articleId", articleId);
		map.put("userId", userId);
		List<Comment> list = cService.showAllComments(map);
		return list;
	}
		
	// Httpservletrequest 추가해 userid 가져오기
	@PostMapping("/article/{articleId}/comments")
	public int write(@RequestBody Comment comment, @PathVariable int articleId, HttpServletRequest request) {
		comment.setArticleId(articleId);
		String token = request.getHeader("access-token");
		String userId = getUserId(token);
		comment.setUserId(comment.getUserId());
		comment.setCommentContent(comment.getCommentContent());
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
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("commentId", commentId);
		int result = cService.increaseCommentLikes(map);
		return result;
	}
	
	@GetMapping("/article/{articleId}/comments/{commentId}/minuslike")
	public int decreaseLike(@PathVariable int articleId, @PathVariable int commentId, @RequestParam String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("commentId", commentId);
		int result = cService.decreaseCommentLikes(map);
		return result;
	}
	
	@GetMapping("/article/{articleId}/comments/{commentId}/plusdislike")
	public int increaseDislike(@PathVariable int articleId, @PathVariable int commentId, @RequestParam String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("commentId", commentId);
		int result = cService.increaseCommentDislikes(map);
		return result;
	}
	
	@GetMapping("/article/{articleId}/comments/{commentId}/minusdislike")
	public int decreaseDislike(@PathVariable int articleId, @PathVariable int commentId, @RequestParam String userId) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("userId", userId);
		map.put("commentId", commentId);
		int result = cService.decreaseCommentDislikes(map);
		return result;
	}
}
