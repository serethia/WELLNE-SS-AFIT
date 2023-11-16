<template>
    <div class="container">
      <h2>Login</h2>
      <fieldset class="text-center">
        <label for="id">아이디</label>
        <input type="text" id="id" v-model="id" class="view" /><br />
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" class="view" /><br />
        <button class="btn" @click="login">로그인</button>
      </fieldset>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useUserStore } from "@/stores/userStore";
  
  const userStore = useUserStore();
  
  const id = ref("");
  const password = ref("");
  
  const login = () => {
    const user = {
      userId: id.value,
      userPwd: password.value,
    };
  
    userStore.setLoginUser(user);
  };
  </script>
  
  <style></style>