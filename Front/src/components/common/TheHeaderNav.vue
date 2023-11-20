<!-- <template>
    <div id="container">
        <header>
            <nav>
                <div class="nav-main">
                <router-link :class="{ 'active-link': $route.name === 'Category' }" :to="{name: 'Category', params: {category: 'exercise'}}">운동</router-link>&nbsp; &nbsp; &nbsp; &nbsp;
                <router-link :class="{ 'active-link': $route.name === 'Category' }" :to="{name: 'Category', params: {category: 'diet'}}">건강식품</router-link>&nbsp; &nbsp; &nbsp; &nbsp;
                <router-link :class="{ 'active-link': $route.name === 'Category' }" :to="{name: 'Category', params: {category: 'advice'}}">전문가칼럼</router-link>
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

/* 카테고리 버튼 색이 개별적으로 변하지 않는 건 아직 파라미터가 store의 메소드로 전달되지 않아서이기도 한 듯 */
nav a.active-link {
  color: #42b983; 
}
</style> -->









<template>
    <div id="container">
        <header>
            <nav>
                <div class="nav-main">
                <router-link :class="{ 'active-link': $route.name === 'Category' && $route.params.category==='exercise' }" :to="{name: 'Category', params: {category: 'exercise'}}">운동</router-link>       
                <router-link :class="{ 'active-link': $route.name === 'Category' && $route.params.category==='diet' }" :to="{name: 'Category', params: {category: 'diet'}}">건강식품</router-link>       
                <router-link :class="{ 'active-link': $route.name === 'Category' && $route.params.category==='advice' }" :to="{name: 'Category', params: {category: 'advice'}}">전문가칼럼</router-link>
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

/* 카테고리 버튼 색이 개별적으로 변하지 않는 건 아직 파라미터가 store의 메소드로 전달되지 않아서이기도 한 듯 */
nav a.active-link {
  color: #42b983; 
}
</style>