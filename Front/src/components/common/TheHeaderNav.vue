<template>
    <div id="container">
        <header>
            <nav>
                <div class="nav-main">
                    <!-- 파라미터로  category를 넘겨서 watch로 내용만 갈아끼우기?? -->
                <router-link :to="{name: 'Category', params: {category: 'exercise'}}">운동</router-link>&nbsp; &nbsp; &nbsp; &nbsp;
                <router-link :to="{name: 'Category', params: {category: 'diet'}}">다이어트</router-link>&nbsp; &nbsp; &nbsp; &nbsp;
                <router-link :to="{name: 'Category', params: {category: 'advice'}}">건강칼럼</router-link>
                <router-link to="/article">기사 (나중에 카테고리로 bind, params로 category 보내주기???)</router-link>
                </div>
                <div class="nav-user">
                    <a href="#" v-if="userStore.isLoggedIn" @click="logout">로그아웃</a>
                    <router-link to="/login" v-else>로그인</router-link>
                    <span class="nav-separator">|</span>
                    <router-link to="/user/regist">회원가입</router-link>
                    <span class="nav-separator">|</span>
                    <router-link to="/">마이페이지</router-link>
                    <span class="nav-separator">|</span>
                    <router-link to="/user">사용자목록</router-link>
                </div>
            </nav>
        </header>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const logout = () => {
  userStore.setLogout();
};
</script>

<style  scoped>
#container {
    text-align: center;
}

nav {
    padding: 30px;
    display: flex;
    justify-content: space-between;
}

nav a {
    font-weight: bold;
    text-decoration: none;
    color: black;
}

.nav-main {
    flex-grow: 1;
    text-align: left;
}

.nav-user {
    text-align: right;
}

.nav-separator {
  margin: 0 5px; 
}

nav a.router-link-exact-active {
    color: #42b983
}
</style>