<template>
  <div>
    <div style=" display: flex; justify-content: center;">
      <table style="table-layout: fixed; width: 90%; margin-left: auto; margin-right: auto;">
        <colgroup>
          <col style="width: 100%;" />
        </colgroup>
        
        <tr v-for="article in articleStore.articleList" :key="article.article_id" style="text-align: left;">
        <RouterLink :to="`/article/${article.articleId}`">

        <td style="display: flex; align-items: center;">
        <div style="margin-right: 10px;">
        <img v-if="!isYouTubeVideo(article.videoUrl)" :src="article.videoUrl" alt="이미지" style="width: 130px; height: 150px; object-fit: cover; margin-left: 5px"/>
        <!-- 이미지를 대체할 로고 이미지 -->
        <img v-else src="@/assets/logo1-1.png" alt="로고" style="width: 130px; height: auto; object-fit: cover; margin-left: 5px"/>
        </div>

        <div style="flex: 1">
        <RouterLink :to="`/article/${article.articleId}`" style="font-size: larger; font-weight: bold; margin-left: 20px;">{{ article.articleTitle }}</RouterLink>
        <br>
        <br>
        <p style="font-size: 15px; overflow: hidden; text-overflow: ellipsis; white-space: normal; margin-left: 20px; margin-right: 10px">{{ truncateText(article.articleContent, 300) }}</p>
        <p style="font-size: 12px; float:inline-end; margin-right: 5px">{{ article.userId }}, {{ article.viewCnt }}, {{ article.createdAt }}</p>
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

<script setup>
import { useArticleStore } from "@/stores/articleStore";
import { onMounted, watch, ref } from "vue";
import { useRouter } from 'vue-router';
import ArticleSearchInput from "@/components/article/ArticleSearchInput.vue";


const articleStore = useArticleStore();
const router = useRouter();
const category = ref(''); 

const isYouTubeVideo = function (url) {
    // YouTube URL 판별
    const regExp = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return regExp.test(url);
};

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

/* 라우터 링크 밑줄 제거 */
a {
  text-decoration: none;
}

table, colgroup, tr, td {
  border-color: darkolivegreen;
}

</style>