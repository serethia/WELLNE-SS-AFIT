package com.ssafy.pjt.model.dao;

import java.util.List;
import java.util.Map;

import com.ssafy.pjt.model.dto.Article;
import com.ssafy.pjt.model.dto.PageNavigation;
import com.ssafy.pjt.model.dto.SearchArticleCondition;

public interface ArticleDao {
	
	//기사 목록 보기
	List<Article> selectAllArticles();
	
	List<Article> selectAllArticlesByCategory(PageNavigation pn);
	
	// 페이지네이션
	// 1. 페이지네이션 정보 가져오기
	int selectTotalArticleCountByCategory(String category);
	
	//기사 등록
	int insertArticle(Article article);
	
	//기사 상세 보기
	Article selectOne(int articleId);
	
	//기사 수정
	int updateArticle(Article article);
	
	//기사 삭제
	int deleteArticle(int articleId);
	
	//조회수 증가
	void updateViewCnt(int articleId);
	
	// 기사 검색
	List<Article> search(SearchArticleCondition condition);
}
