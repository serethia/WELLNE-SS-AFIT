<template>
    <div class="container">
      <UserSearch />   
      <h2>사용자 목록</h2>
      <h4>등록된 사용자의 수 : {{ userCount }}</h4>
      <div v-if="userCount">
        <table class="user-list">
          <colgroup>
            <col style="width: 5%" />
            <col style="width: 20%" />
            <col style="width: 20%" />
            <col style="width: 25%" />
            <col style="width: 10%" />
            <col style="width: 15%" />
            <col style="width: 5%"  />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>아이디</th>
              <th>이름</th>
              <th>이메일</th>
              <th>별명</th>
              <th>관심사</th>
              <th>권한</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in usersList" :key="index">
              <td>{{ index + 1 }}</td>
              <td>
                <router-link class="user-link" :to="`/user/${user.userId}`">{{
                  user.userId
                }}</router-link>
              </td>
              <td>{{ user.userName }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.nickname }}</td>
              <td>{{ user.category }}</td>
              <td>{{ changeRoleName(user.role) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>등록된 사용자가 없습니다.</div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, computed } from "vue";
  import { useUserStore } from "@/stores/userStore";
  import UserSearch from "@/components/user/UserSearch.vue";
  
  const userStore = useUserStore();

  const changeRoleName = (role) => {
    const roles = ['일반 회원', '기자', '관리자'];
    return roles[role];
  }

  const usersList = computed(() => userStore.users);
  const userCount = computed(() => usersList.value.length);
  
  onMounted(() => { 
    userStore.setUsers();
  });
  </script>