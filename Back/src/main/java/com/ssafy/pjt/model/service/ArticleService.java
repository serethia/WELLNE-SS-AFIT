package com.ssafy.pjt.model.service;

import java.util.List;

import com.ssafy.pjt.model.dto.Article;

public interface ArticleService {

	List<Article> getArticles();
	
	List<Article> getArticlesByCategory(String category);
	
	int writeArticle(Article article);
	
	Article getArticle(int articleId);
	
	int modifyArticle(Article article);
	
	int removeArticle(int articleId);
}
