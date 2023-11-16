<template>
    <div class="container">
      <h2>회원 정보</h2>
      <fieldset class="text-center">
        <label for="id">아이디</label>
        <input
          readonly
          type="text"
          id="id"
          v-model="user.userId"
          class="view"
        /><br />
        <label for="password">비밀번호</label>
        <input
          type="password"
          id="password"
          v-model="user.userPwd"
          class="view"
        /><br />
        <label for="name">이름</label>
        <input
          type="text"
          id="name"
          v-model="user.userName"
          class="view"
        /><br />
        <label for="email">이메일</label>
        <input
          type="email"
          id="email"
          v-model="user.email"
          class="view"
        /><br />
        <label for="nickname">별명</label>
        <input
          type="text"
          id="nickname"
          v-model="user.nickname"
          class="view"
        /><br />
        <button class="btn" @click="updateTheUser">수정</button>
        <button class="btn" @click="removeUser">삭제</button>
      </fieldset>
    </div>
  </template>
  
  <script setup>
  import { ref, onBeforeMount } from "vue";
  import { useUserStore } from "@/stores/userStore";
  import { useRoute } from "vue-router";
  import { storeToRefs } from "pinia";
  
  const { user } = storeToRefs(useUserStore());
  const userStore = useUserStore();
  const route = useRoute();
  
  const updateTheUser = () => {
    userStore.updateUser();
  };
  
  const removeUser = () => {
    userStore.deleteUser(user.value.userId);
  };
  
  onBeforeMount(() => {
    const userId = route.params.id;
    userStore.setUser(userId);
  });
  </script>
  