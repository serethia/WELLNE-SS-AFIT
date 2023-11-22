<!-- 아마 삭제할 지도 -->

<template>
    <div>
      <ul class="pagination">
        <li v-if="pagination.getFirstPageAvailable()" @click="pageChange(1)">
          <span>&lt;&lt;</span>
        </li>
        <li v-if="pagination.getPreviousPageAvailable()" @click="pageChange(currentPage - 1)">
          <span>&lt;</span>
        </li>
  
        <li v-for="page in pagination.getPages()" :key="page" @click="pageChange(page)" :class="{ active: page === currentPage }">
          <span>{{ page }}</span>
        </li>
  
        <li v-if="pagination.getNextPageAvailable()" @click="pageChange(currentPage + 1)">
          <span>&gt;</span>
        </li>
        <li v-if="pagination.getLastPageAvailable()" @click="pageChange(pagination.getTotalPageCount())">
          <span>&gt;&gt;</span>
        </li>
      </ul>
    </div>
  </template>
  
<script setup>


import { ref, onMounted, computed, watch } from 'vue'
import { useArticleStore } from '@/stores/articleStore'
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useArticleStore()

const itemsPerPage = 10;
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(store.board.length / itemsPerPage));

const computedArticle = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const articles = store.articleList.slice(startIndex, endIndex)
  return articles;
})

const pages = computed(()=>{
  const startPage = Math.max(1, currentPage.value - 2);
  const totalPages =  Math.ceil(store.board.length / itemsPerPage);
  const endPage = Math.min(totalPages, startPage + 4);
  return  Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
})

onMounted(() => {
  store.getArticleListByCategory();
  updatePages();
})

watch(currentPage, () => {
  updatePages();
});

const updatePages = () => {
  const startPage = Math.max(1, currentPage.value - 2);
  const endPage = Math.min(totalPages.value, startPage + 4);

  pages.value = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};


</script>



  <style scoped>
  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 20px 0;
  }
  
  .pagination li {
    cursor: pointer;
    margin: 0 5px;
    padding: 5px 10px;
    border: 1px solid #ccc;
  }
  
  .pagination li.active {
    background-color: #007bff;
    color: #fff;
  }
  </style>