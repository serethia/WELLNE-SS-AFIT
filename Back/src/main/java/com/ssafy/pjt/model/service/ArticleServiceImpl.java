package com.ssafy.pjt.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.pjt.model.dao.ArticleDao;
import com.ssafy.pjt.model.dto.Article;
import com.ssafy.pjt.model.dto.SearchArticleCondition;

@Service
public class ArticleServiceImpl implements ArticleService {

	@Autowired
	private ArticleDao dao;
	
	@Override
	public List<Article> getArticles() {
		return dao.selectAllArticles();
	}

	@Override
	public int writeArticle(Article article) {
		return dao.insertArticle(article);
	}

	@Override
	public Article getArticle(int articleId) {
		dao.updateViewCnt(articleId);
		return dao.selectOne(articleId);
	}

	@Override
	public int modifyArticle(Article article) {
		return dao.updateArticle(article);		
	}

	@Override
	public int removeArticle(int articleId) {
		return dao.deleteArticle(articleId);		
	}

	@Override
	public List<Article> getArticlesByCategory(String category) {
		return dao.selectAllArticlesByCategory(category);
	}

	@Override
	public List<Article> search(SearchArticleCondition condition) {
		return dao.search(condition);
	}

}
