<template>
    <div class="search">
        <div>
            <label>검색 기준 :</label>
            <select v-model="searchInfo.key">
                <option value='none'>없음</option>
                <option value="user_id">작성자</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
            </select>
        </div>
        &nbsp; &nbsp;

        <div>
            <label>검색 내용 :</label>
            <input type="text" v-model="searchInfo.word" />
        </div>
        &nbsp; &nbsp;

        <div>
            <label>정렬 기준 :</label>
            <select v-model="searchInfo.orderBy">
                <option value='none'>없음</option>
                <option value="writer">작성자</option>
                <option value="title">제목</option>
                <option value="view_cnt">조회수</option>
            </select>
        </div>
        &nbsp; &nbsp;

        <div>
            <label>정렬 방향 :</label>
            <select v-model="searchInfo.orderByDir">
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
            </select>
        </div>
        &nbsp; &nbsp;

        <div>
            <button @click="searchArticleList">검색</button>
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;


        <div>
            <router-link to="/article-create">
            <button>작성</button>
            </router-link>
        </div>
    
    
    </div>
</template>
  
<script setup>
import { ref } from 'vue';
import { useArticleStore } from '@/stores/articleStore'

const articleStore = useArticleStore()
const searchInfo = ref({
    key: 'none',
    word: '',
    orderBy: 'none',
    orderByDir: 'asc'
})
const searchArticleList = function () {
    articleStore.searchArticleList(searchInfo.value)
}
</script>
  
<style scoped>
.search {
    display: flex;
}
</style>