<template>
  <div class="container">
    <h2 style="text-align: center; color:darkolivegreen">My Profile</h2>
    <br>
    <fieldset class="text-center" style="width: 90%; margin-left: auto; margin-right: auto">
      <label for="id">아이디</label>
      <input
        readonly
        type="text"
        id="id"
        v-model="userStore.loginUserId"
        class="view"
      /><br />
      <label for="name">이름</label>
      <input
        readonly
        type="text"
        id="name"
        v-model="userStore.user.userName"
        class="view"
      /><br />
      <label for="email">이메일</label>
      <input
        readonly
        type="email"
        id="email"
        v-model="userStore.user.email"
        class="view"
      /><br />
      <label for="nickname">별명</label>
      <input
       readonly
        type="text"
        id="nickname"
        v-model="userStore.loginUserNickname"
        class="view"
      /><br />
      <label for="category">관심사</label>
      <input
        readonly
        type="text"
        id="category"
        :value="userStore.user.category"
        class="view"
      /><br>
      <label for="role">권한</label>
      <input
        readonly
        type="text"
        id="role"
        :value="roleName"
        class="view"
      />
    </fieldset>
    <br>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
// import { useRoute } from "vue-router";
// import { storeToRefs } from "pinia";

// const { user } = storeToRefs(useUserStore());
const userStore = useUserStore();
// const route = useRoute();

const user = ref({
       userId: "",
       userName: "",
       email: "",
       nickname: "",
       category: [],
       role: 0
       });

const roleName = computed(() => {
  const roles = ['일반 회원', '기자', '관리자'];
  return roles[userStore.loginUserRole];
});

onBeforeMount(async () => {
  // const userId = route.params.id;
  await userStore.setUser(userStore.loginUserId);
  user.value = {...userStore.user};
});
</script>