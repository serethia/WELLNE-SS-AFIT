USE ssafyspringpjt;

SHOW TABLES;

SELECT
	c.comment_id as commentId,
	c.comment_content as commentContent,
	c.user_id as userId,
	c.article_id as articleId,
	c.created_at as createdAt,
	c.modified_at as modifiedAt,
	u.nickname,
	(SELECT COUNT(*) FROM comment_like l WHERE l.comment_id= c.comment_id) as like_cnt,
	(SELECT COUNT(*) FROM comment_dislike d WHERE d.comment_id= c.comment_id) as dislike_cnt
	FROM comment c
	JOIN user u ON c.user_id = u.user_id
	WHERE c.article_id = 1;

-- 전체 좋아요 수 commentLikeCnt 
	SELECT COUNT(*) FROM comment_like l WHERE l.comment_id= 1;
    
    SELECT * FROM comment_like;
    
-- 로그인 유저 좋아요 수 userCommentLikeCnt
	SELECT COUNT(*) FROM comment_like l WHERE l.comment_id= 1 AND l.user_id = 'admin';
    
    
SELECT
	c.comment_id as commentId,
	c.comment_content as commentContent,
	c.user_id as userId,
	c.article_id as articleId,
	c.created_at as createdAt,
	c.modified_at as modifiedAt,
	u.nickname,
	(SELECT COUNT(*) FROM comment_like l WHERE l.comment_id= c.comment_id) as commentLikeCnt,
	(SELECT COUNT(*) FROM comment_dislike d WHERE d.comment_id= c.comment_id) as commentDislikeCnt,
    (SELECT COUNT(*) FROM comment_like l WHERE l.comment_id= c.comment_id AND l.user_id = 'admin') as userCommentLikeCnt,
    (SELECT COUNT(*) FROM comment_dislike d WHERE d.comment_id= c.comment_id AND d.user_id = 'admin') as userCommentDislikeCnt
	FROM comment c
	JOIN user u ON c.user_id = u.user_id
	WHERE c.article_id = 1;
    

INSERT INTO comment_dislike (comment_id, user_id) VALUES (2, 'admin');
INSERT INTO comment_dislike (comment_id, user_id) VALUES (1, 'admin');
INSERT INTO comment_like (comment_id, user_id) VALUES (1, 'admin');

SELECT
	c.comment_id as commentId,
	c.comment_content as commentContent,
	c.user_id as userId,
	c.article_id as articleId,
	c.created_at as createdAt,
	c.modified_at as modifiedAt,
	u.nickname
	FROM comment c
	JOIN user u ON c.user_id = u.user_id
	WHERE c.article_id = 1;

set SQL_SAFE_UPDATES = 0;  # disable safe mode
DELETE FROM comment_like WHERE user_id = 'admin';
