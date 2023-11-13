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
import com.ssafy.pjt.model.service.ArticleService;

@RequestMapping("/articleapi")
@RestController
@CrossOrigin("*")
public class ArticleController {
	
	@Autowired
	private ArticleService aService;
	
	@GetMapping("/article")
	public List<Article> getArticle(){
		List<Article> list = aService.getArticles();
		return list;
	}
	
	@PostMapping("/article")
	public int write(@RequestBody Article article) {
		int result = aService.writeArticle(article);
		return result;
	}
	
	@GetMapping("/article/{articleId}")
	public Article detail(@PathVariable int articleId) {
		return aService.getArticle(articleId);
	}
	
	@PutMapping("/article/{articleId}")
	public int update(@RequestBody Article article, @PathVariable int articleId) {
		article.setArticleId(articleId);
		int result = aService.modifyArticle(article);
		return result;
	}
	
	@DeleteMapping("/article/{articleId}")
	public int delete(@PathVariable int articleId) {
		int result = aService.removeArticle(articleId);
		return result;
	}
	
	
}
