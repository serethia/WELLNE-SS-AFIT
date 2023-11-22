<template>
    <div>
        
        <table>
            <tr style="background-color: whitesmoke;">
                <th>제목</th>
                <th>작성자</th>
                <th>조회수</th>
                <th>작성 일자</th>
            </tr>
            <tr v-for="article in articleStore.articleList" :key="article.article_id" style="text-align: center;">
                <td>
                    <RouterLink :to="`/article/${article.articleId}`">{{ article.articleTitle }}</RouterLink>
                </td>
                <td>{{ article.userId }}</td>
                <td>{{ article.viewCnt }}</td>
                <td>{{ article.createdAt }}</td>
            </tr>
        </table>
       
        <br>
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

<style scoped>
table {
    width: 100%; 
    justify-content: space-between;
    border: 1px solid black;
    border-collapse: collapse;
}

th, td {
    border: 1px solid black;
}
</style>