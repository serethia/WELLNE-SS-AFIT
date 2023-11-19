<template>
    <div>
        <h2>댓글</h2>
        <h4>댓글 수 : {{ commentCnt }}</h4>

        <!--댓글 목록, 본인 댓글만 수정/삭제 버튼, 좋아요/싫어요 구현-->
        <div v-if="commentCnt" class="commentlist">
            <ul>
                <li v-for="comment in comments" :key="comment.commentId">
                    {{ comment.nickname }} : {{ comment.commentContent }}
                    
                    <button v-if="isLoggedIn && comment.userId === loginUser.userId" @click="updateComment(comment.articleId, comment.commentId)">수정</button>
                    <button v-if="isLoggedIn && comment.userId === loginUser.userId" @click="deleteComment(comment.articleId, comment.commentId)">삭제</button>
                    
                    <button @click="toggleLike(comment.articleId, comment.commentId)" :disabled="isLiked(comment.commentId)">좋아요</button>
                    <span>{{ likeCnt(comment.commentLike) }}</span>
                    <button @click="toggleDislike(comment.articleId, comment.commentId)" :disabled="isDisliked(comment.commentId)">싫어요</button>
                    <span>{{ dislikeCnt(comment.commentDislike) }}</span>
                </li>
            </ul>
        </div>
        <div v-else>첫 댓글을 작성해주세요.</div>

        <!--로그인 상태에서 댓글 입력란, 작성 버튼 구현-->
        <form @submit.prevent="writeComment" v-if="isLoggedIn">
            <textarea v-model="newComment" rows="3" placeholder="댓글을 입력하세요."></textarea>
            <button :disabled="newComment.trim() === ''" class="btn btn-outline-primary btn-sm">등록</button>
        </form>
    </div>
</template>
  
<script setup>
import { ref, computed, onMounted } from "vue";
import { useCommentStore } from "@/stores/commentStore";
import { useUserStore } from "@/stores/userStore";

const commentStore = useCommentStore();
const userStore = useUserStore();

const comments = computed(() => commentStore.comments);
const commentCnt = computed(() => comments.value.length);
const isLoggedIn = computed(() => userStore.isLoggedIn);
const loginUser = computed(() => userStore.loginUser);
const newComment = ref('');

onMounted(() => {
    if(comments.value.length > 0){
    const articleId = comments.value[0]?.articleId;
    commentStore.showComments(articleId);
    }
})

</script>
  
<style scoped>
.commentlist {
    display: inline-block;
    width: 20%;
    margin: 20px;
    text-align: center;
    border: 1px solid rgb(201, 201, 201);
    background-color: rgb(242, 242, 247);
    border-radius: 5%;
    box-shadow: 0 4px 4px -4px black;
}
</style>
  