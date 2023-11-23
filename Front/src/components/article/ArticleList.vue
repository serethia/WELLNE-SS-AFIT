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

    <div class="pagination-container">
    <!-- 이전 버튼 -->
    <button
      v-if="articleStore.pagination.startRange"
      class="page-button prev-button"
      @click="changePage(currentPage - 1)"
      aria-label="Previous"
    >
      <span aria-hidden="true">«</span>
    </button>

    <!-- 페이지 번호 목록 -->
    <ul class="pagination-list">
      <li v-for="page in pages" :key="page" :class="{ active: page === currentPage }">
        <button class="page-button" @click="changePage(page)">{{ page }}</button>
      </li>
    </ul>

    <!-- 다음 버튼 -->
    <button
      v-if="articleStore.pagination.endRange"
      class="page-button next-button"
      @click="changePage(currentPage + 1)"
      aria-label="Next"
    >
      <span aria-hidden="true">»</span>
    </button>
  </div>






    <!-- <div>
    <ul class="pagination">
       이전 페이지 
      <li v-if="articleStore.pagination.startRange" class="page-item">
        <button class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous">
          <span aria-hidden="true">«</span>
        </button>
      </li>
      
       페이지 번호 목록 
      <li v-for="page in pages" :key="page" :class="{ active: page === currentPage }" class="page-item">
        <button class="page-link" @click="changePage(page)">{{ page }}</button>
      </li>
      
       다음 페이지
      <li v-if="articleStore.pagination.endRange" class="page-item">
        <button class="page-link" @click="changePage(currentPage + 1)" aria-label="Next">
          <span aria-hidden="true">»</span>
        </button>
      </li>
    </ul>
  </div> -->

  <ArticleSearchInput />

    <!-- <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous">
            <span aria-hidden="true">«</span>
          </a>
        </li>
        <li v-for="page in pages" :key="page" class="page-item" :class="{ active: page === currentPage }">
          <a class="page-link" @click="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" @click="changePage(currentPage + 1)" aria-label="Next">
            <span aria-hidden="true">»</span>
          </a>
        </li>
      </ul>
    </nav>


     -->
  </div> 
</template>

<script setup>
import { useArticleStore } from "@/stores/articleStore";
import { onMounted, watch, ref } from "vue";
import { useRouter } from 'vue-router';
import ArticleSearchInput from "@/components/article/ArticleSearchInput.vue";

const articleStore = useArticleStore();
const router = useRouter();

const category = ref("");

const currentPage = ref(articleStore.pagination.currentPage);

const pages = Array.from({ length: articleStore.pagination.totalPageCount }, (_, index) => index + 1);

const changePage = (page) => {
  if (page >= 1 && page <= articleStore.pagination.totalPageCount) {
    console.log('change page')
    articleStore.setCurrentPage(page);
    // currentPage.value = page;
    // 페이지 변경에 따른 추가 작업 수행
    // 예: 다른 데이터를 가져오거나 화면 갱신 등
    articleStore.getPagination(router.currentRoute.value.params.category)
    articleStore.getArticleListByCategory(router.currentRoute.value.params.category);
  }
};



//페이지네이션
// articleStore.articleList.length : 게시글의 전체 개수

// 1. Spring Server : 게시글 전체 개수만 가져오기.





watch(() => router.currentRoute.value.params.category, (newCategory) => {
    category.value = newCategory;
    articleStore.getArticleListByCategory(newCategory);
});

// watch(currentPage, () => {
//   updatePages();
// });

onMounted(() => {
    

    const initialCategory = router.currentRoute.value.params.category;
    category.value = initialCategory;
    // 페이지네이션을 고려하지 않은 로직
    articleStore.getArticleListByCategory(initialCategory);
    articleStore.getPagination(initialCategory);

    // 페이지네이션
    // 1. 전체 글 개수먼저 가져오기
    // articleStore.getTotalArticleCountByCategory(initialCategory);
    // 2. 특정 범위의 글만 가져오기
    // - currentPage : 1 => 1~5
    // - currentPage : 2 => 6~10
    // - currentPage : 3 => 11~15
    
    console.log(articleStore.pagination)
    console.log(articleStore.articleList)
    console.log(articleStore.currentPage)


    
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

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 페이지네이션 버튼 스타일 */
.page-button {
  border: none;
  background-color: #fff;
  color: #333;
  padding: 8px 12px;
  margin: 0 2px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out;
}

.page-button:hover {
  background-color: #f0f0f0;
}

.pagination-list {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

.prev-button,
.next-button {
  font-size: 18px;
}

.active {
  font-weight: bold;
  background-color: #333;
  color: #fff;
}

</style>