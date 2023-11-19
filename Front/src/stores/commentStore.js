import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";


const URL = 'http://localhost:8080/commentapi'


export const useCommentStore = defineStore("comment", () => {

  
  const comments = ref([]);
  const comment = ref('');
  const commentCnt = ref(0);
  const likeCnt = ref(0);
  const dislikeCnt = ref(0);
  let disable = false;
  const likedComments = ref([]);
  const dislikedComments = ref([]);

  const accessToken = ref('');


  // 댓글 등록
  const writeComment = (articleId, newComment) => {
    axios.post(`${URL}/article/${articleId}/comments`, {commentContent: newComment},
        {
            headers: {
                "access-token": accessToken.value  // 세션에서 해당 토큰 가져오기 (헤더)
            }
        })
         .then((res) => {
            comments.value.push(res.data);
            commentCnt.value = comments.value.length;
            newComment.value = ''; // 입력란 초기화
            showComments(articleId);
        })
  };


  // 댓글 삭제
  const deleteComment = (articleId, commentId) => {
    axios.delete(`${URL}/article/${articleId}/comments/${commentId}`,
        {
            headers: {
                "access-token": accessToken.value
            }
        })
         .then(() => {
            alert("댓글이 삭제되었습니다.");
            showComments(articleId);
        })
  };


  // 댓글 수정
  const updateComment = (articleId, commentId, updatedComment) => {
    axios.put(`${URL}/article/${articleId}/comments/${commentId}`, {commentContent: updatedComment}, 
        {
            headers:{
                "access-token": accessToken.value
            }
        })
         .then(() => {
            showComments(articleId);
        })
  };


  // 모든 댓글 조회
  const showComments = (articleId) => {
    axios.get(`${URL}/article/${articleId}`,
        {
            headers: {
                "access-token": accessToken.value
            }
        })
         .then((res) => {
            comments.value = res.data;
        })
  };


  // 좋아요 toggle
  const toggleLike = (articleId, commentId) => {
    const enable = !disable;
    if(enable){
        disable = true;
        axios.put(`${URL}/article/${articleId}/comments/${commentId}/pluslike`, null,
            {
                headers: {
                    "access-token": accessToken.value
                }
            })
            .then((res) => {
                const likes = res.data.likeCnt;
                const commentIdx = comments.value.findIndex(comment => comment.commentId === commentId);
                if(commentIdx !== -1){
                    comments.value[commentIdx].commentLike = likes;
                    if(isLiked(commentId)){
                        likedComments.value = likedComments.value.filter(id => id !== commentId);
                    } else {
                        likedComments.value.push(commentId);
                    }
                }
            })
            .finally(() => {
                disable = false;
            })
    }
  };

  const isLiked = commentId => {
    return likedComments.value.includes(commentId);
  }


  // 싫어요 toggle
  const toggleDislike = (articleId, commentId) => {
    const enable = !disable;
    if(enable){
    axios.put(`${URL}/article/${articleId}/comments/${commentId}/pluslike`, null,
        {
            headers: {
                "access-token": accessToken.value
            }
        })
        .then((res) => {
            const dislikes = res.data.dislikeCnt;
            const commentIdx = comments.value.findIndex(comment => comment.commentId === commentId);
            if(commentIdx !== -1){
                comments.value[commentIdx].commentDislike = dislikes;
                if(isDisliked(commentId)){
                    dislikedComments.value = dislikedComments.value.filter(id => id !== commentId);
                } else {
                    dislikedComments.value.push(commentId);
                }
            }
        })
        .finally(() => {
            disable = false;
        })
    }
  };

  const isDisliked = commentId => {
    return dislikedComments.value.includes(commentId);
  }



  return {accessToken, comments, comment, commentCnt, likeCnt, dislikeCnt, likedComments, dislikedComments,
    writeComment, deleteComment, updateComment, showComments, toggleLike, isLiked, toggleDislike, isDisliked};

}, { persist: {
    storage: sessionStorage }});
