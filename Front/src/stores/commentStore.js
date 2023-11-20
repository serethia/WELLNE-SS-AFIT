import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "@/stores/userStore.js";


const URL = 'http://localhost:8080/commentapi'


export const useCommentStore = defineStore("comment", () => {

  
  const comments = ref([]);
  const comment = ref('');
  const commentCnt = ref(0);
  const commentLikeCnt = ref(0);
  const commentDislikeCnt = ref(0);
  let isLiked = false;
  let isDisliked = false;
  let disable = false;
  const likedComments = ref([]);
  const dislikedComments = ref([]);
  const accessToken = ref('');
  const userStore = useUserStore();


  // 댓글 등록
  const writeComment = (articleId, newComment) => {
    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

    axios.post(`${URL}/article/${articleId}/comments`, 
        {
            commentContent: newComment,
            nickname: userStore.loginUserNickname
        },
        {
            headers: {
                "access-token": accessToken.value 
            }
        })
         .then((res) => {
            comments.value.push(res.data);
            commentCnt.value = comments.value.length;
            //newComment.value = ''; // 입력란 초기화
            showComments(articleId);
        })
  };


  // 댓글 삭제
  const deleteComment = (articleId, commentId) => {
    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

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
    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

    axios.put(`${URL}/article/${articleId}/comments/${commentId}`, 
        {
            commentContent: updatedComment
        }, 
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
    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

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
    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

    const enable = !disable;
    if(enable){
        disable = true;
        if(isLiked){
            isLiked = false;
        } else {
            isLiked = true;
            console.log('plus like request')
            console.log(userStore.loginUserId);
            axios.get(`${URL}/article/${articleId}/comments/${commentId}/pluslike?userId=${userStore.loginUserId}`,
            {
                headers: {
                    "access-token": accessToken.value
                }
            })
            .then((res) => {
                const likes = res.data.commentLikeCnt;
                const commentIdx = comments.value.findIndex(comment => comment.commentId === commentId);
                if(commentIdx !== -1){
                    comments.value[commentIdx].commentLike = likes;
                    if(isLiked){
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
    }
  };


  // 싫어요 toggle
  const toggleDislike = (articleId, commentId) => {
    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

    const enable = !disable;
    if(enable){
        disable = true;
        if(isDisliked){
            isDisliked = false;
        } else {
            isDisliked = true;
         axios.put(`${URL}/article/${articleId}/comments/${commentId}/plusdislike`, null,
        {
            headers: {
                "access-token": accessToken.value
            }
        })
        .then((res) => {
            const dislikes = res.data.commentDislikeCnt;
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
  }
};


  return {accessToken, comments, comment, commentCnt, commentLikeCnt, commentDislikeCnt, likedComments, dislikedComments,
    writeComment, deleteComment, updateComment, showComments, disable, toggleLike, isLiked, toggleDislike, isDisliked};

}, { persist: {
    storage: sessionStorage }});
