<template>
    
    <div>
        <div style=" display: flex; justify-content: center;">
        <table style="table-layout: fixed; width: 100%; margin-left: auto; margin-right: auto;">
            <colgroup>
                <col style="width: 100%;" /> 
                
            </colgroup>

        <tr style="background-color: whitesmoke;">
          
        </tr>
        <tr v-for="article in articleStore.articleList" :key="article.article_id" style="text-align: left;">
        <RouterLink :to="`/article/${article.articleId}`">
            <td style="display: flex; align-items: center;">
            <div style="margin-right: 10px;">
              <img :src="article.videoUrl" style="max-width: 150px;"/>
            </div>
            <div>
              <RouterLink :to="`/article/${article.articleId}`">{{ article.articleTitle }}</RouterLink>
              <p style="font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ truncateText(article.articleContent, 100) }}</p>
              <p style="font-size: 12px;">{{ article.userId }}, {{ article.viewCnt }}, {{ article.createdAt }}</p>

            </div>
          </td>
        </RouterLink>
        </tr>
      </table>
        </div>
      <br>
      <ArticleSearchInput />
    </div>
  </template>

<!-- <template>
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
</template> -->

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

//미리보기 글자수 제한
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return `${text.slice(0, maxLength)}...`;
  }
  return text;
}


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