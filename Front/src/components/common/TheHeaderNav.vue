<template>
    <div id="container">
        <header>
            <nav>
                <div class="nav-container">
                    <div class="nav-main">
                    <router-link :class="{ 'active-link': $route.name === 'category' && $route.params.category==='exercise' }" :to="{name: 'category', params: {category: 'exercise'}}">운동</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <router-link :class="{ 'active-link': $route.name === 'category' && $route.params.category==='diet' }" :to="{name: 'category', params: {category: 'diet'}}">건강식품</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
                    <router-link :class="{ 'active-link': $route.name === 'category' && $route.params.category==='advice' }" :to="{name: 'category', params: {category: 'advice'}}">전문가칼럼</router-link>
                    </div>

                    <div class="nav-logo">
                    <img src="src\assets\logo1-1.png" style="width:80px;"/>
                    </div>

                    <div class="nav-user">
                        <a href="#" v-if="userStore.isLoggedIn" @click="logout">로그아웃</a>
                        <router-link to="/login" v-else>로그인</router-link>
                        <span class="nav-separator">|</span>
                        <router-link to="/user/regist">회원가입</router-link>
                        <span class="nav-separator">|</span>
                        <router-link to="/">마이페이지</router-link>
                        <!-- role이 2인 관리자만 볼 수 있도록 -->
                        <span v-show="loginUserRole === 2 && userStore.isLoggedIn">
                        <span class="nav-separator">|</span>
                        <router-link to="/user">사용자목록</router-link>
                        </span>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userStore";
import { ref, watch, computed } from "vue";

const userStore = useUserStore();
const loginUserRole = computed(() => userStore.loginUserRole);

const logout = () => {
  userStore.setLogout();
};

const showUserList = computed(() => loginUserRole.value === 2);
watch(loginUserRole, (newValue) => {
  showUserList.value = newValue.value === 2;
  console.log("showUserList 잘 나오나 확인:", showUserList.value);
});
console.log("loginUserRole 잘 나오나 확인:", loginUserRole);
console.log("showUserList 잘 나오나 확인:", showUserList);
</script>

<style  scoped>
#container {
    text-align: center;
    background-color: honeydew;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
}

nav a {
    font-weight: bold;
    text-decoration: none;
    color:navy;
}

.nav-main {
   
    text-align: left;
    white-space: nowrap;
    margin-right: 10px;
}

.nav-logo {
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
}

.nav-user {
    text-align: right;
    white-space: nowrap;
    margin-left: 10px;
}

.nav-separator {
  margin: 0 5px; 
}

nav a.router-link-exact-active {
    color: #42b983
}

nav a.active-link {
  color: #42b983; 
}
</style>