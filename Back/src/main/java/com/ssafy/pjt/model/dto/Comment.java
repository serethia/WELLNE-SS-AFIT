package com.ssafy.pjt.model.dto;

public class Comment {
	private int commentId;
	private String commentContent;
	private String userId;
	private int articleId;
	private String createdAt;
	private String modifiedAt;
	private int commentLikeCnt;
	private int commentDislikeCnt;
	// lft, rgt, depth 필요한가?? 대댓글.. 일단 보류!
	private int lft;
	private int rgt;
	private int depth;
	private String nickname;  // userId를 이용해 nickname 값을 불러와 vue.js에서 화면에 나타낸다.
	
	public Comment() {		
	}

	// lft, rgt, depth 필요한가??
	public Comment(String commentContent, String userId, int articleId) {
		this.commentContent = commentContent;
		this.userId = userId;
		this.articleId = articleId;
	}
	
	public int getCommentId() {
		return commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getArticleId() {
		return articleId;
	}

	public void setArticleId(int articleId) {
		this.articleId = articleId;
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

	public int getCommentLikeCnt() {
		return commentLikeCnt;
	}

	public void setCommentLikeCnt(int commentLikeCnt) {
		this.commentLikeCnt = commentLikeCnt;
	}

	public int getCommentDislikeCnt() {
		return commentDislikeCnt;
	}

	public void setCommentDislikeCnt(int commentDislikeCnt) {
		this.commentDislikeCnt = commentDislikeCnt;
	}
	
//	public int getLft() {
//		return lft;
//	}
//
//	public void setLft(int lft) {
//		this.lft = lft;
//	}
//
//	public int getRgt() {
//		return rgt;
//	}
//
//	public void setRgt(int rgt) {
//		this.rgt = rgt;
//	}
//
//	public int getDepth() {
//		return depth;
//	}
//
//	public void setDepth(int depth) {
//		this.depth = depth;
//	}
	
	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	// lft, rgt, depth 필요한가??
	@Override
	public String toString() {
		return "Comment [commentId=" + commentId + ", commentContent=" + commentContent + ", userId=" + userId
				+ ", articleId=" + articleId + ", createdAt=" + createdAt + ", modifiedAt=" + modifiedAt
				+ ", commentLikeCnt=" + commentLikeCnt + ", commentDislikeCnt=" + commentDislikeCnt + ", lft=" + lft + ", rgt="
				+ rgt + ", depth=" + depth + ", nickname=" + nickname + "]";
	}

}
