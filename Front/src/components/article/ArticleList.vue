<!-- <template>
    <div>
        <ul>
            <li v-for="article in articleList" :key="article.article_id">
                <router-link :to="{ name: 'ArticleDetail', params: { id: article.article_id} }">{{ article.article_title }}</router-link>
            </li>
        </ul>
    </div>
  </template>
  
  <script setup>
    import { onMounted, ref } from "vue";
    import { useArticleStore } from "@/stores/articleStore";

    const articleStore = useArticleStore();

    const articleList = ref([]);

    onMounted(() => {
        articleStore.getArticles($props.category);  // store에 메소드 작성 미완성 상태
    });
  </script>
  
  <style scoped>
  
  </style> -->





<template>
    <div>
        <hr>
        <table>
            <tr>
                <th>제목</th>
                <th>쓰니</th>
                <th>조회수</th>
                <th>등록</th>
            </tr>
            <tr v-for="article in articleStore.articleList" :key="article.article_id">
                <td>
                    <RouterLink :to="`/article/${article.articleId}`">{{ article.articleTitle }}</RouterLink>
                </td>
                <td>{{ article.userId }}</td>
                <td>{{ article.viewCnt }}</td>
                <td>{{ article.createdAt }}</td>
            </tr>
        </table>
        <hr>
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