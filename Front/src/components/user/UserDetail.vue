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
        <label for="category">관심사</label>
        <input
          type="text"
          id="category"
          v-model="user.category"
          class="view"
        /><br />
        <label for="role">권한</label>
        <input
          readonly
          type="text"
          id="role"
          v-model="roleName"
          class="view"
        /><br><br>
        <button class="btn" @click="updateTheUser"><span>수정</span></button>&nbsp;&nbsp;&nbsp;
        <button class="btn" @click="removeUser"><span>삭제</span></button>
      </fieldset>
    </div>
  </template>
  
  <script setup>
  import { onBeforeMount, computed } from "vue";
  import { useUserStore } from "@/stores/userStore";
  import { useRoute } from "vue-router";
  import { storeToRefs } from "pinia";
  
  const { user } = storeToRefs(useUserStore());
  const userStore = useUserStore();
  const route = useRoute();
  const roleName = computed(() => {
  const roles = ['일반 회원', '기자', '관리자'];
  return roles[userStore.user.role];
  });
  
  const updateTheUser = () => {
    userStore.updateUser(user.value);
  };
  
  const removeUser = () => {
    userStore.deleteUser(user.value.userId);
  };

  onBeforeMount(() => {
    const userId = route.params.id;
    userStore.setUser(userId);
  });
  </script> 

<style scoped>
.btn {
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 20px;
  padding: 15px;
  width: 120px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.btn span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.btn span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.btn:hover span {
  padding-right: 25px;
}

.btn:hover span:after {
  opacity: 1;
  right: 0;
}
</style>