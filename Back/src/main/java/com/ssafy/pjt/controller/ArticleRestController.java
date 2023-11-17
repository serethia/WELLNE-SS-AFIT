package com.ssafy.pjt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.pjt.model.dto.Article;
import com.ssafy.pjt.model.dto.User;
import com.ssafy.pjt.model.service.ArticleService;

import io.swagger.annotations.ApiOperation;

@RequestMapping("/articleapi")
@RestController
@CrossOrigin("*")
public class ArticleRestController {
	
	@Autowired
	private ArticleService aService;
	
	@GetMapping("/article")
	@ApiOperation(value = "등록된 모든 기사 정보를 반환한다.", response = Article.class)
	public List<Article> getArticle(){
		List<Article> list = aService.getArticles();
		return list;
	}
	
	@PostMapping("/article")
	@ApiOperation(value = "기사 정보를 작성한다.", response = Integer.class)
	public int write(@RequestBody Article article) {
		int result = aService.writeArticle(article);
		return result;
	}
	
	@GetMapping("/article/{articleId}")
	@ApiOperation(value = "{articleId}에 해당하는 기사 정보를 반환한다.", response = Article.class)
	public Article detail(@PathVariable int articleId) {
		return aService.getArticle(articleId);
	}
	
	@PutMapping("/article/{articleId}")
	@ApiOperation(value = "기사 정보를 수정한다.", response = Integer.class)
	public int update(@RequestBody Article article, @PathVariable int articleId) {
		article.setArticleId(articleId);
		int result = aService.modifyArticle(article);
		return result;
	}
	
	@DeleteMapping("/article/{articleId}")
	@ApiOperation(value = "{articleId} 에 해당하는 기사 정보를 삭제한다.", response = Integer.class)
	public int delete(@PathVariable int articleId) {
		int result = aService.removeArticle(articleId);
		return result;
	}
	
	
}
