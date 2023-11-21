<template>
        <div style="float:right">
            <router-link to="/article-create">
            <span v-show="loginUserRole !== 0 && userStore.isLoggedIn">
            <button class="button">작성</button>
            </span>
            </router-link>
        </div>
        <br>
        <br>

    <div class="search">
            <form style="width: 100%">
                <label>검색 기준</label>
            <select v-model="searchInfo.key">
                <option value='none'>없음</option>
                <option value="user_id">작성자</option>
                <option value="title">제목</option>
                <option value="content">내용</option>
            </select>&nbsp; &nbsp;
            <span style="position: relative; width: 400px; height: 30px; margin: 10px auto">
            <label>검색 내용</label>
            <input type="text" placeholder="검색어 입력" v-model="searchInfo.word" style="width: 15%; border: 1px solid #bbb; border-radius: 8px; padding: 10px 12px; font-size: 14px"/>
            <input @click="searchArticleList" type="image" src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" alt="Submit Form" style="position: absolute; width: 15px; top: 5px; right: 10px; margin: 0" />
            </span>
        &nbsp; 

        <span>
            <label>정렬 기준</label>
            <select v-model="searchInfo.orderBy">
                <option value='none'>없음</option>
                <option value="writer">작성자</option>
                <option value="title">제목</option>
                <option value="view_cnt">조회수</option>
            </select>
        </span>
        &nbsp; 

        <span>
            <label>정렬 방향</label>
            <select v-model="searchInfo.orderByDir">
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
            </select>
        </span>
        &nbsp;
        </form>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue';
import { useArticleStore } from '@/stores/articleStore'
import { useUserStore } from '@/stores/userStore';

const articleStore = useArticleStore();
const userStore = useUserStore();
const searchInfo = ref({
    key: 'none',
    word: '',
    orderBy: 'none',
    orderByDir: 'asc'
})
const searchArticleList = function () {
    articleStore.searchArticleList(searchInfo.value)
}
const loginUserRole = computed(() => userStore.loginUserRole);
</script>
  
<style scoped>
.search {
    display: flex;
    text-align: center; 
    width: 100%;
}

.button {
  display: inline-block;
  padding: 6px 10px;
  font-size: 13px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #04AA6D;
  border: none;
  border-radius: 15px;
  box-shadow: 0 5px #999;
}

.button:hover {background-color: #3e8e41}

.button:active {
  background-color: #3e8e41;
  box-shadow: 0 3px #666;
  transform: translateY(4px);
}
</style>
