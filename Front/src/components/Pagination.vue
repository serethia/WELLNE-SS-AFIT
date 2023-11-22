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
  import { ref, watch, onMounted } from 'vue';
  import axios from 'axios';
  import { useArticleStore } from '@/stores/articleStore';
  
  const articleStore = useArticleStore();
  
  const currentPage = ref(1);
  const totalItemCount = ref(0);
  const countPerPage = 10; // Set a default value for countPerPage
  
  const category = ref('');
  const word = ref('');
  
  const pagination = {
    getFirstPageAvailable: () => currentPage.value > 1,
    getPreviousPageAvailable: () => currentPage.value > 1,
    getNextPageAvailable: () => currentPage.value < totalItemCount.value / countPerPage,
    getLastPageAvailable: () => currentPage.value < totalItemCount.value / countPerPage,
    getPages: () => {
      const totalPages = Math.ceil(totalItemCount.value / countPerPage);
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    },
    getTotalPageCount: () => Math.ceil(totalItemCount.value / countPerPage),
  };
  
  const getData = () => {
  const offset = (currentPage.value - 1) * countPerPage;
  axios.get('http://localhost:8080/articleapi/article', {
    params: {
      category: category.value,
      word: word.value,
      page: currentPage.value,
    },
  })
  .then(response => {
    totalItemCount.value = response.data.totalCount;
    articleStore.articleList = response.data.articles;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
};
  
  const pageChange = page => {
    currentPage.value = page;
    getData();
  };
  
  watch(() => articleStore.articleList, (newArticleList) => {
    totalItemCount.value = newArticleList.length; // Assuming the length of the articleList is the total count
  });
  
  // Initial data fetch
  onMounted(getData);
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