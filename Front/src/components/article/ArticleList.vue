<template>
    <div>
        <h4>게시글 목록</h4>
        <hr>
        <table>
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>쓰니</th>
                <th>조회수</th>
                <th>등록</th>
            </tr>
            <tr v-for="article in articleStore.articleList" :key="article.article_id">
                <td>{{ article.articleId }}</td>
                <td>
                    <RouterLink :to="`/article/${article.articleId}`">{{ article.articleTitle }}</RouterLink>
                </td>
                <td>{{ article.userId }}</td>
                <td>{{ article.viewCnt }}</td>
                <td>{{ article.createdAt }}</td>
            </tr>
        </table>

        <ArticleSearchInput />
    </div>
</template>

<script setup>
import { useArticleStore } from "@/stores/articleStore";
import { onMounted } from "vue";
import ArticleSearchInput from "./ArticleSearchInput.vue";
const articleStore = useArticleStore()

onMounted(() => {
    articleStore.getArticleList()
})

</script>

<style scoped></style>
