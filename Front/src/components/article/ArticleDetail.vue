<template>
    <div>
        <h4>게시글 상세</h4>
        <hr>
        <div>{{ store.article.title }}</div>
        <div>{{ store.article.writer }}</div>
        <div>{{ store.article.regDate }}</div>
        <div>{{ store.article.viewCnt }}</div>
        <div>{{ store.article.content }}</div>

        <button @click="deleteArticle">삭제</button>
        <button @click="updateArticle">수정</button>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useArticleStore } from "@/stores/article";
import { onMounted } from "vue";
import axios from 'axios'

const store = useArticleStore()

const route = useRoute();
const router = useRouter();
onMounted(() => {
    store.getArticle(route.params.id)
})
const deleteArticle = function () {
    axios.delete(`http://localhost:8080/articleapi/article/${route.params.id}`)
        .then(() => {
            router.push({ name: 'articleList' })
        })
}

const updateArticle = function () {
    router.push({ name: 'articleUpdate' })
}


</script>

<style scoped></style>