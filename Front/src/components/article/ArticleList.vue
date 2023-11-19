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
import { onMounted, watch, ref } from "vue";
import { useRouter } from 'vue-router';
import ArticleSearchInput from "./ArticleSearchInput.vue";

const articleStore = useArticleStore();
const router = useRouter();
const category = ref(''); 





watch(() => router.currentRoute.value.params.category, (newCategory) => {
    category.value = newCategory;
    articleStore.getArticleListByCategory(newCategory);
});

onMounted(() => {
    const initialCategory = router.currentRoute.value.params.category;
    category.value = initialCategory;
    articleStore.getArticleListByCategory(initialCategory);
});




</script>
