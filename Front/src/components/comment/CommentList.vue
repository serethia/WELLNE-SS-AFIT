<template>
    <div class="comments">
        <h2>댓글</h2>
        <h4>댓글 수 : {{ commentCnt }}</h4>

        <!--댓글 목록, 본인 댓글만 수정/삭제 버튼, 좋아요/싫어요 구현-->
        <div v-if="commentCnt" class="commentlist">
          <ul>
            <li v-for="comment in comments" :key="comment.commentId" style="text-align: left;">
                  <v-card-text>
                    {{ comment.nickname }} :
                    
                    <span v-show="comment.commentId !== currentCommentId"> {{ comment.commentContent }} 
                    
                      <button v-if="isLoggedIn && comment.userId === loginUserId" @click="updateComment(comment.commentId)">수정</button>
                      <button v-if="isLoggedIn && comment.userId === loginUserId" @click="deleteComment(comment.commentId)">삭제</button>
                    </span>
                    
                    <span v-show="comment.commentId === currentCommentId">
                      <input  type="text" v-model="updatedComment">
                      <button v-if="isLoggedIn && comment.userId === loginUserId" v-btn type="submit" class="ml-2" outlined small color="#356859" @click="saveUpdatedComment(comment.commentId)"> 등록 </button>
                      <button v-if="isLoggedIn && comment.userId === loginUserId" class="ml-2 mt-1" outlined small color="#356859" @click="currentCommentId = null"> 취소 </button>
                    
                    
                    </span>
                  </v-card-text>
                  
                  
                  <!-- 
                    button 엘리먼트에 disable 속성을 하면 다시 누를수가 없으므로... 
                    btn-disable class(CSS)를 만들고 스타일을 적용. 
                  -->                    
                  <span style="justify: end;">
                    &nbsp;&nbsp;<button @click="toggleLike(comment.commentId)" :class="{'button-disabled': comment.userCommentLikeCnt >= 1}">좋아요</button>&nbsp;        
                    <span>{{ comment.commentLikeCnt }}</span>
                    &nbsp;<button @click="toggleDislike(comment.commentId)" :class="{'button-disabled': comment.userCommentDislikeCnt >= 1}">싫어요</button>&nbsp;
                    <span>{{ comment.commentDislikeCnt }}</span>
                  </span>
                    <!-- <button @click="toggleLike(comment.articleId, comment.commentId)" :disabled="isLiked(comment.commentId)">좋아요</button> -->
                    <!-- &nbsp;&nbsp;<button @click="toggleLike(comment.commentId)" :disabled="comment.userCommentLikeCnt >= 1">좋아요</button>&nbsp; -->
                    <!-- <button @click="onClick(comment.commentId, 'like')" :disabled="isLiked(comment.commentId)">좋아요</button> -->
                    <!-- <span>{{ comment.commentLikeCnt }}</span> -->
                    <!-- <button @click="toggleDislike(comment.articleId, comment.commentId)" :disabled="isDisliked(comment.commentId)">싫어요</button> -->
                    <!-- &nbsp;<button @click="toggleDislike(comment.commentId)" :disabled="comment.userCommentDislikeCnt >= 1">싫어요</button>&nbsp; -->
                    <!-- <button @click="onClick(comment.commentId, 'dislike')" :disabled="isDisliked(comment.commentId)">싫어요</button> -->
                    <!-- <span>{{ comment.commentDislikeCnt }}</span> -->
                    <!-- </span> -->
                  </li>
            </ul>
          </div>
        <div v-else>첫 댓글을 작성해주세요.</div>
        <br>
        <!--로그인 상태에서 댓글 입력란, 작성 버튼 구현-->
        <form @submit.prevent="writeComment" v-if="isLoggedIn">
          <textarea v-model="newComment" rows="5" placeholder="댓글을 입력하세요." style="width: 800px"></textarea>&nbsp;&nbsp;
          <button :disabled="newComment.trim() === ''" class="button">등록</button>
        </form>
      </div>
    </template>
  
<script setup>
import { ref, computed, onMounted } from "vue";
import { useCommentStore } from "@/stores/commentStore";
import { useUserStore } from "@/stores/userStore";
import { useRoute } from 'vue-router';

const route = useRoute();
const commentStore = useCommentStore();
const userStore = useUserStore();

const comment = computed(() => commentStore.comment);
const comments = computed(() => commentStore.comments);
const commentCnt = computed(() => comments.value.length);
const isLoggedIn = computed(() => userStore.isLoggedIn);
const loginUserId = computed(() => userStore.loginUserId);
const newComment = ref('');
const updatedComment = ref('');
const currentCommentId = ref(null); // 지금 수정할 Comment의 Id

onMounted(() => {
    const articleId = route.params.id;
    commentStore.showComments(articleId);
})

const writeComment = function () {
    const articleId = route.params.id;
    commentStore.writeComment(articleId, newComment.value);
    newComment.value = ''; // 입력란 초기화
}

const updateComment = function (commentId) {
    const articleId = route.params.id;
    currentCommentId.value = commentId;
    console.log("currentCommentId", currentCommentId.value);
    let c = comments.value.find(c => c.commentId === commentId)
    console.log(c)
    updatedComment.value = c.commentContent;

    // commentStore.updateComment(articleId, commentId, updatedComment.value);
}

const saveUpdatedComment = function(commentId){
  console.log(`${commentId}를 ${updatedComment.value}로 수정합니다.`)
  const articleId = route.params.id;
  
  // 1. 프로미스가 아닌경우
  //   updateComment : 비동기 작업
  // commentStore.updateComment(articleId, commentId, updatedComment.value);  // 비동기 작업 시작
  // 비동기 작업을 시작하고 바로 여기로 옴
  // saveUpdatedComment 함수의 입장에서는 비동기 작업이 끝나든 말든 상관없이 밑의 줄의 코드를 실행

  // 2.프로미스를 사용하는 경우
  // updateCommentPromse : 비동기 작업을 수행하는 프로미스를 반환
  // 프로미스가 끝나고 수행할 작업은 then()안에서 수행 가능
  commentStore.updateCommentPromise(articleId, commentId, updatedComment.value)
  .then(()=>{ // 업데이트가 완료되었으면..
    currentCommentId.value = null; // 다시 초기화
  })
  
}

// 다른 코드 형태 비교:
// const saveUpdatedCommentAsync = async function(commentId){
//   console.log(`${commentId}를 ${updatedComment.value}로 수정합니다.`)
//   const articleId = route.params.id;
  
//   // 1. 프로미스가 아닌경우
//   //   updateComment : 비동기 작업
//   // commentStore.updateComment(articleId, commentId, updatedComment.value);  // 비동기 작업 시작
//   // 비동기 작업을 시작하고 바로 여기로 옴
//   // saveUpdatedComment 함수의 입장에서는 비동기 작업이 끝나든 말든 상관없이 밑의 줄의 코드를 실행

//   // 2.프로미스를 사용하는 경우
//   // updateCommentPromse : 비동기 작업을 수행하는 프로미스를 반환
//   // 프로미스가 끝나고 수행할 작업은 then()안에서 수행 가능
//   await updateCommentPromise(articleId, commentId, updatedComment.value);
//   // await는 async 안에서만 사용 가능
//   currentCommentId.value = null;
  
// }

const deleteComment = function (commentId) {
    const articleId = route.params.id;
    commentStore.deleteComment(articleId, commentId);
}

const toggleLike = function (commentId) {
    const articleId = route.params.id;
    commentStore.toggleLike(articleId, commentId);
}

const toggleDislike = function (commentId) {
    const articleId = route.params.id;
    commentStore.toggleDislike(articleId, commentId);
}
</script>
  
<style scoped>
.commentlist {
    display: inline-block;
    width: 80%;
    margin: 20px;
    text-align: center;
    border: 1px solid rgb(201, 201, 201);
    background-color: rgb(242, 242, 247);
    border-radius: 5%;
    box-shadow: 0 4px 4px -4px black;
}

.comments {
    text-align: center;
}

.button {
  display: inline-block;
  padding: 6px 10px;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #04AA6D;
  border: none;
  border-radius: 15px;
  box-shadow: 0 5px #999;
}

.button:hover {background-color: #3e8e41}

.button:active {
  background-color: #3e8e41;
  box-shadow: 0 3px #666;
  transform: translateY(4px);
}

/* 직접 비활성화 대신 비활성화된 버튼 디자인을 흉내낸 스타일 */
.button-disabled {
  background-color: rgba(239, 239, 239, 0.3);
  border: 1px solid rgba(118, 118, 118, 0.3);
  color: rgba(16, 16, 16, 0.3);
}
</style>
  