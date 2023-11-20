<template>
    <div>
        <hr>
        <h1>{{ store.article.articleTitle }}</h1>
        <div v-if="isYouTubeVideo" v-html="renderYouTubeVideo(store.article.videoUrl)"></div>
        <div v-else>{{ store.article.videoUrl }}</div>
        <div>{{ store.article.articleContent }}</div>
        <div>{{ store.article.userName }}</div>
        <div>{{ store.article.viewCnt }}</div>
        <div>{{ store.article.createdAt }}</div>
        
        
        <button @click="updateArticle">수정</button>
        <button @click="deleteArticle">삭제</button>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from "@/stores/articleStore";
import { onMounted } from "vue";
import axios from 'axios'

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


