<template>
    <div id="container">
        <header>
            <nav>
                <div class="nav-main">
                    <!-- 파라미터로  category를 넘겨서 watch로 내용만 갈아끼우기?? -->
                    <RouterLink to="/">운동</RouterLink>&nbsp; &nbsp; &nbsp; &nbsp; 
                    <RouterLink to="/">다이어트</RouterLink>&nbsp; &nbsp; &nbsp; &nbsp; 
                    <RouterLink to="/">건강칼럼</RouterLink>
                </div>
                <div class="nav-user">
                    <a href="#" v-if="getUser" @click="logout">로그아웃</a>
                    <RouterLink to="/login" v-else>로그인</RouterLink>
                    <span class="nav-separator">|</span>
                    <RouterLink to="/user/regist">회원가입</RouterLink>
                    <span class="nav-separator">|</span>
                    <RouterLink to="/user">사용자목록</RouterLink>
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