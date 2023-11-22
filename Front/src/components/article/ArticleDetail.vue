<template>
    <div class="detail">
        <hr>
        <br>
        <h1>{{ store.article.articleTitle }}</h1>
        <br>        
        <div v-if="isYouTubeVideo(store.article.videoUrl)" v-html="renderYouTubeVideo(store.article.videoUrl)"></div>
        <div v-else>
            <img :src="store.article.videoUrl" />
        </div>
        <br>
        <br>
        <div style="display: inline-block; width:60%; text-align: justify; white-space: pre-wrap">{{ store.article.articleContent }}</div>
        <h4>작성자 : {{ store.article.userName }} &nbsp;&nbsp;&nbsp;  
            조회수 : {{ store.article.viewCnt }} &nbsp;&nbsp;&nbsp;  
            작성 일자 : {{ store.article.createdAt }} &nbsp;</h4> 
        <br>
        <span>
        <button @click="updateArticle" class="button2" style="vertical-align:middle"><span>수정</span></button> 
        <button @click="deleteArticle" class="button2" style="vertical-align:middle"><span>삭제</span></button></span>   
    </div>
    <br>
    <CommentList/>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from "@/stores/articleStore";
import { onMounted } from "vue";
import CommentList from '@/components/comment/CommentList.vue';

const store = useArticleStore()
const route = useRoute();
const router = useRouter();

onMounted(() => {
    store.getArticle(route.params.id)
})

const deleteArticle = function () {
    store.deleteArticle(route.params.id)
}

const updateArticle = function () {
    router.push({ name: 'articleUpdate' })
}

// 밑으로 유튜브 관련

const extractVideoId = function (url) {
    // YouTube URL로부터 동영상 ID 추출
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        return match[2];
    } else {
        // 유효하지 않은 YouTube URL이라면 처리 방법을 선택하세요.
        return ''; // 빈 문자열 또는 다른 처리 방법
    }
};

const isYouTubeVideo = function (url) {
    // YouTube URL 판별
    const regExp = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return regExp.test(url);
};

const renderYouTubeVideo = function (url) {
    if (!url) return ''; // URL이 없을 경우 빈 문자열 반환

    const videoId = extractVideoId(url);
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
};

</script>

<style scoped>
.detail {
  text-align: center;
}

.button2 {
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 13px;
  padding: 10px;
  width: 80px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.button2 span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button2 span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button2:hover span {
  padding-right: 25px;
}

.button2:hover span:after {
  opacity: 1;
  right: 0;
}
</style>

