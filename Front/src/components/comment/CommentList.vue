<template>
    <div class="comments">
        <h2>댓글</h2>
        <h4>댓글 수 : {{ commentCnt }}</h4>

        <!--댓글 목록, 본인 댓글만 수정/삭제 버튼, 좋아요/싫어요 구현-->
        <div v-if="commentCnt" class="commentlist">
            <ul>
                <li v-for="comment in comments" :key="comment.commentId" style="text-align: left;">
                    {{ comment.nickname }} : {{ comment.commentContent }}
                    
                    <button v-if="isLoggedIn && comment.userId === loginUserId" @click="updateComment(comment.commentId)">수정</button>
                    <button v-if="isLoggedIn && comment.userId === loginUserId" @click="deleteComment(comment.commentId)">삭제</button>
                    
                    <span style="justify: end;">
                    <!-- <button @click="toggleLike(comment.articleId, comment.commentId)" :disabled="isLiked(comment.commentId)">좋아요</button>-->
                    &nbsp;&nbsp;<button @click="toggleLike(comment.commentId)" :disabled="isLiked">좋아요</button>&nbsp;
                    <span>{{ comment.commentLikeCnt }}</span>
                    <!--<button @click="toggleDislike(comment.articleId, comment.commentId)" :disabled="isDisliked(comment.commentId)">싫어요</button>-->
                    &nbsp;<button @click="toggleDislike(comment.commentId)" :disabled="isDisliked">싫어요</button>&nbsp;
                    <span>{{ comment.commentDislikeCnt }}</span>
                    </span>
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

const comments = computed(() => commentStore.comments);
const commentCnt = computed(() => comments.value.length);
const isLoggedIn = computed(() => userStore.isLoggedIn);
const loginUserId = computed(() => userStore.loginUserId);
const newComment = ref('');
const updatedComment = ref('');
const isLiked = computed(() => commentStore.isLiked);
const isDisliked = computed(() => commentStore.isDisliked);

onMounted(() => {
    // if(comments.value.length > 0){
    // const articleId = comments.value[0]?.articleId;
    const articleId = route.params.id;
    commentStore.showComments(articleId);
})

const writeComment = function () {
    const articleId = route.params.id;
    commentStore.writeComment(articleId, newComment.value);
    newComment.value = '';
}

const updateComment = function (commentId) {
    const articleId = route.params.id;
    commentStore.updateComment(articleId, commentId, updatedComment);
}

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

</style>
  