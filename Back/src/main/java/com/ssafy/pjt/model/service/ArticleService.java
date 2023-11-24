package com.ssafy.pjt.model.service;

import java.util.List;

import com.ssafy.pjt.model.dto.Article;
import com.ssafy.pjt.model.dto.PageNavigation;
import com.ssafy.pjt.model.dto.SearchArticleCondition;

public interface ArticleService {

	List<Article> getArticles();
	
	List<Article> getArticlesByCategory(PageNavigation pn);
	
	int getTotalArticleCountByCategory(String category);
	
	int writeArticle(Article article);
	
	Article getArticle(int articleId);
	
	int modifyArticle(Article article);
	
	int removeArticle(int articleId);
	
	List<Article> search(SearchArticleCondition condition);
}
