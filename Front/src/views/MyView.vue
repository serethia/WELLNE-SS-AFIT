<template>
  <div class="container">
    <br />
    <div class="text-center">
      <br>
      <br>
      <img src="src\assets\logo1-2.png" style="width: 50%"/>
      <br>
      <br>
      <h1>{{ message }}</h1>
    </div>
    <br>
    <br>
    <MyProfile v-if="userStore.isLoggedIn" />
  </div>
  <br>
  <br>
</template>

<script setup>
import MyProfile from '@/components/my/MyProfile.vue';
import { useUserStore } from "@/stores/userStore";
const userStore = useUserStore();

const message = "건강 뉴스 사이트에 오신것을 환영합니다!";
</script>

<style>
.text-center {
  text-align: center;
}

</style>

