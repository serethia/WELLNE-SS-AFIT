<template>
    <div>
        <h4>게시글 작성</h4>
        <fieldset>
            <legend>등록</legend>
            <div>
                <label for="title">제목 : </label>
                <input type="text" id="title" v-model="article.title">
            </div>
            <div>
                <label for="writer">기자 : </label>
                <input type="text" id="writer" v-model="article.writer">
            </div>
            <div>
                <label for="content">내용 : </label>
                <textarea id="content" cols="30" rows="10" v-model="article.content"></textarea>
            </div>


            <div>
                <label for="video">비디오 URL : </label>
                <input type="url" id="video" v-model="article.video">
            </div>

            <div>
                <label for="media">언론사 : </label>
                <input type="text" id="media" v-model="article.media">
            </div>


            <div>
                <label for="category">카테고리 : </label>
                <input type="text" id="category" v-model="article.writer">
            </div>
            


            <div>
                <button @click="createArticle">등록</button>
            </div>
        </fieldset>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useArticleStore } from "@/stores/articleStore";

const store = useArticleStore()
const article = ref({
    title: '',
    content: '',
    writer: '',
    video: '',
    media: '',
    category: ''

})

const createArticle = function () {
    store.createArticle(article.value)
}
</script>

<style scoped></style>
