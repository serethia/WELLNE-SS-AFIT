package com.ssafy.pjt.model.dto;

public class SearchCondition {
	// 검색 컬럼으로 기본인 none은 검색하지 않는다.
	private String key = "none";
	// 검색어: ex: 토니
	private String word;
	// 검색 결과를 정렬할 컬럼 이름으로 기본인 none은 정렬하지 않는다.
	private String orderBy = "none";
	// 정렬 방향으로 기본은 asc
	private String orderByDir = "asc";
	// 한 페이지에 몇개나 보여줄 것인지 결정한다.
	public final int countPerPage = 10;
	// 현재 페이지 번호로 offset을 계산할 때 사용된다. 기본 페이지는 1이다.
	private int currentPage = 1;
	// limit 를 적용할 것인지 설정한다.
	private boolean limit = true;

	public SearchCondition() {
	}

	public SearchCondition(String key, String word) {
		this(key, word, "none");
	}

	public SearchCondition(String key, String word, String orderBy) {
		this(key, word, orderBy, "asc");
	}

	public SearchCondition(String key, String word, String orderBy, String orderByDir) {
		this.key = key;
		this.word = word;
		this.orderBy = orderBy;
		this.orderByDir = orderByDir;
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

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public boolean isLimit() {
		return limit;
	}

	public void setLimit(boolean limit) {
		this.limit = limit;
	}
	
	// limit의 offset을 구한다. 페이징으로 일부분만을 가져올 때 페이지의 시작 정보 위치로 메서드에 의해 계산된다. 전달된 currentPage는 1부터 시작하고 DB는 0부터이므로 1을 빼준다.
	public int getOffset() {
		return (this.currentPage - 1) * countPerPage;
	}

	@Override
	public String toString() {
		return "SearchCondition [key=" + key + ", word=" + word + ", orderBy=" + orderBy + ", orderByDir=" + orderByDir
				+ ", currentPage=" + currentPage + ", limit=" + limit + "]";
	}

}