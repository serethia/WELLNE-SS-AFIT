<template>
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
  
  </style>