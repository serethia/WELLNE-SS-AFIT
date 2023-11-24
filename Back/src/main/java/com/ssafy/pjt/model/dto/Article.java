package com.ssafy.pjt.model.dto;

public class Article {
	
	private int articleId;
	private String articleTitle;
	private String articleContent;
	private int viewCnt;
	private String userId;
	private String videoUrl;
	private String createdAt;
	private String modifiedAt;
	private String mediaName;
	private String category;
	private String userName;
		
	public Article() {
	}

	public Article(String articleTitle, String articleContent, int viewCnt, String userId,	String videoUrl, String mediaName, String category, String userName) {
		this.articleTitle = articleTitle;
		this.articleContent = articleContent;
		this.viewCnt = viewCnt;
		this.userId = userId;
		this.videoUrl = videoUrl;
		this.mediaName = mediaName;
		this.category = category;
		this.userName = userName;
	}

	public int getArticleId() {
		return articleId;
	}

	public void setArticleId(int articleId) {
		this.articleId = articleId;
	}

	public String getArticleTitle() {
		return articleTitle;
	}

	public void setArticleTitle(String articleTitle) {
		this.articleTitle = articleTitle;
	}

	public String getArticleContent() {
		return articleContent;
	}

	public void setArticleContent(String articleContent) {
		this.articleContent = articleContent;
	}

	public int getViewCnt() {
		return viewCnt;
	}

	public void setViewCnt(int viewCnt) {
		this.viewCnt = viewCnt;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getVideoUrl() {
		return videoUrl;
	}

	public void setVideoUrl(String videoUrl) {
		this.videoUrl = videoUrl;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public String getModifiedAt() {
		return modifiedAt;
	}

	public void setModifiedAt(String modifiedAt) {
		this.modifiedAt = modifiedAt;
	}

	public String getMediaName() {
		return mediaName;
	}

	public void setMediaName(String mediaName) {
		this.mediaName = mediaName;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Override
	public String toString() {
		return "Article [articleId=" + articleId + ", articleTitle=" + articleTitle + ", articleContent="
				+ articleContent + ", viewCnt=" + viewCnt + ", userId=" + userId + ", videoUrl=" + videoUrl
				+ ", createdAt=" + createdAt + ", modifiedAt=" + modifiedAt + ", mediaName=" + mediaName + ", category="
				+ category + ", userName=" + userName + "]";
	}
	
}
