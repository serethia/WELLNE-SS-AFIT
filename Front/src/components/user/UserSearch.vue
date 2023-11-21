<template>
    <div class="container">
      <div class="text-center">
       <span style="position: relative; margin: auto">
        <input
          class="view"
          type="text"
          v-model="search"
          placeholder="이름을 입력하세요."
          style="border: 1px solid #bbb; border-radius: 8px; font-size: 18px"
        />
        <span class="frame">
        <button class="custom-btn btn-3" @click="searchForUser"><span>검색</span></button>
        </span>
        </span>

      </div>
      <div v-if="search">
        <h2>검색 결과</h2>
        <div v-if="searchUserCount">
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
                <th>별명</th>
                <th>관심사</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in searchResults" :key="index">
                <td>{{ index + 1 }}</td>
                <td>
                  <RouterLink class="user-link" :to="`/user/${user.userId}`">{{
                    user.userId
                  }}</RouterLink>
                </td>
                <td>{{ user.userName }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.nickname }}</td>
                <td>{{ user.category }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>검색 결과가 없습니다.</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useUserStore } from "@/stores/userStore";
  
  const userStore = useUserStore();
  
  const search = ref("");
  const searchResults = computed(() => userStore.searchUsers);
  const searchUserCount = computed(() => userStore.searchUserCnt);
  
  const searchForUser = () => {
    userStore.searchName(search.value);
  };
  </script>

<style scoped>
.search {
    display: flex;
    text-align: center; 
    width: 100%;
}
.frame {
  width: 90%;
  margin: 40px auto;
  text-align: center;
}

button {
  margin: 20px;
  outline: none;
}
.custom-btn {
  width: 130px;
  height: 40px;
  padding: 10px 25px;
  border: 2px solid #000;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}
.btn-3 {
  line-height: 39px;
  padding: 0;
}
.btn-3:hover{
  background: transparent;
  color: #000;
}
.btn-3 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-3:before,
.btn-3:after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  background: #000;
  transition: all 0.3s ease;
}
.btn-3:before {
  height: 0%;
  width: 2px;
}
.btn-3:after {
  width: 0%;
  height: 2px;
}
.btn-3:hover:before {
  height: 100%;
}
.btn-3:hover:after {
  width: 100%;
}
.btn-3 span:before,.btn-3 span:after {
  position: absolute;
  content: "";
  right: 0;
  bottom: 0;
  background: #000;
  transition: all 0.3s ease;
}
.btn-3 span:before {
  width: 2px;
  height: 0%;
}
.btn-3 span:after {
  width: 0%;
  height: 2px;
}
.btn-3 span:hover:before {
  height: 100%;
}
.btn-3 span:hover:after {
  width: 100%;
}
</style>
  