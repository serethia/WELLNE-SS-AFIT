<template>
    <div>
        <h4>게시글 수정</h4>
        <fieldset>
            <legend>등록</legend>
            <div>
                <label for="title">제목 : </label>
                <input type="text" id="title" v-model="articleStore.article.articleTitle">
            </div>
            <div>
                <label for="writer">작성자 : </label>
                <input type="text" id="writer" readonly v-model="articleStore.article.userId">
            </div>
            <div>
                <label for="content">내용 : </label>
                <textarea id="content" cols="30" rows="10" v-model="articleStore.article.articleContent"></textarea>
            </div>


            <div>
                <label for="video">비디오 URL : </label>
                <input type="url" id="video" v-model="articleStore.article.videoUrl">
            </div>

            <div>
                <label for="media">언론사 : </label>
                <input type="text" id="media" v-model="articleStore.article.mediaName">
            </div>


            <div>
                <label for="category">카테고리 : </label>
                <input type="text" id="category" v-model="articleStore.article.category">
            </div>
            <div>
                <button @click="updateArticle">수정</button>
            </div>
        </fieldset>
    </div>
</template>

<script setup>
import { useArticleStore } from "@/stores/articleStore";


const articleStore = useArticleStore()

const updateArticle = function () {
    articleStore.updateArticle(articleStore.article.articleId)
}
</script>

<style scoped></style>