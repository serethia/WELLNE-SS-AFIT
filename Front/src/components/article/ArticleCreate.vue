<template>
    <div>
        <h4>게시글 작성</h4>
        <fieldset>
            <legend>등록</legend>
            <div>
                <label for="title">제목 : </label>
                <input type="text" id="title" v-model="title">
            </div>
            <div>
                <label for="writer">기자 : </label>
                <input type="text" id="writer" v-model="writer">
            </div>
            <div>
                <label for="content">내용 : </label>
                <textarea id="content" cols="30" rows="10" v-model="content"></textarea>
            </div>


            <div>
                <label for="video">비디오 URL : </label>
                <input type="url" id="video" v-model="video">
            </div>

            <div>
                <label for="media">언론사 : </label>
                <input type="text" id="media" v-model="media">
            </div>


            <div>
                <label for="category">카테고리 : </label>
                <input type="text" id="category" v-model="category">
            </div>
            


            <div>
                <button @click.prevent="regist">등록</button>
            </div>
        </fieldset>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useArticleStore } from "@/stores/articleStore";
import { useUserStore } from "@/stores/userStore";

const articleStore = useArticleStore()
const userStore = useUserStore()


const title = ref("");
const writer = ref("");
const content = ref("");
const video = ref("");
const media = ref("");
const category = ref("");

const regist = function () {
    console.log("아티클을 등록합니다.")
    const article = {
      articleTitle: title.value,
      articleContent: content.value,
      userId: userStore.loginUserId,
      videoUrl: video.value,
      mediaName: media.value,
      category: category.value,
    };

    console.log(article)
    articleStore.createArticle(article)
}
</script>

<style scoped></style>
