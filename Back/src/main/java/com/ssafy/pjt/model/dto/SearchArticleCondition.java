package com.ssafy.pjt.model.dto;

public class SearchArticleCondition {
	private String key = "none";
	private String word;
	private String orderBy = "none";
	private String orderByDir;
	private String category;

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public SearchArticleCondition() {
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getWord() {
		return word;
	}

	public void setWord(String word) {
		this.word = word;
	}

	public String getOrderBy() {
		return orderBy;
	}

	public void setOrderBy(String orderBy) {
		this.orderBy = orderBy;
	}

	public String getOrderByDir() {
		return orderByDir;
	}

	public void setOrderByDir(String orderByDir) {
		this.orderByDir = orderByDir;
	}

	@Override
	public String toString() {
		return "SearchArticleCondition [key=" + key + ", word=" + word + ", orderBy=" + orderBy + ", orderByDir="
				+ orderByDir + ", category=" + category + "]";
	}

	
	

}