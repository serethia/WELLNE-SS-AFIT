<template>
    <div class="container">
      <h2>사용자 목록</h2>
      <h4>등록된 사용자의 수 : {{ userCount }}</h4>
      <div v-if="userCount">
        <table class="user-list">
          <colgroup>
            <col style="width: 5%" />
            <col style="width: 40%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 15%" />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>아이디</th>
              <th>이름</th>
              <th>이메일</th>
              <th>나이</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in usersList" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <RouterLink class="user-link" :to="`/user/${user.id}`">{{
                  user.id
                }}</RouterLink>
              </td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.age }} 세</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>등록된 사용자가 없습니다.</div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  import { useUserStore } from "@/stores/userStore";
  
  const userStore = useUserStore();
  
  const usersList = userStore.users;
  const userCount = usersList.length;
  
  onMounted(() => { 
    
  });
  </script>