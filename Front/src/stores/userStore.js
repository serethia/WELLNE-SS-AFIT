import { ref } from "vue";
import { defineStore } from "pinia";
import router from "@/router";

export const useUserStore = defineStore("user", () => {
  const users = ref([]);
  const searchUsers = ref([]);
  const user = ref(null);
  const loginUser = ref(null);

  const userCnt = ref(0);
  const searchUserCnt = ref(0);

  const createUser = (inputUser) => {
    if (!loginUser.value) {
      users.value.push(inputUser)
      router.push({ name: "Login" })
    } else {
      alert("로그아웃 후 회원가입 해주세요")
    }
  };

  const deleteUser = (userId) => {
    const idx = users.value.findIndex((u) => u.id === userId)
  
    if (idx !== -1) {
      users.value.splice(idx, 1)
    }

    router.push({ name: "List" })
  };

  const setLogout = () => {
    loginUser.value = null
    router.push({ name: "Login" })
  };

  const setUser = (userId) => {
    user.value = users.value.find((u) => u.id === userId)
  };

  const searchName = (query) => {
    searchUsers.value = users.value.filter((u) => u.name.includes(query))
    searchUserCnt.value = searchUsers.value.length
  };

  const updateUser = (updateUser) => {
      const idx = users.value.findIndex((u) => u.id === updateUser.id)
  
      if (idx !== -1) {
        users.value.splice(idx, 1, updateUser)
      }

      router.push({ name: "List" })
    };

  const setLoginUser = (inputUser) => {
    if (users.value.some((u) => u.id === inputUser.id && u.password === inputUser.password)) {
      loginUser.value = inputUser
      router.push({ name: "Home" })
    } else {
      alert("로그인 실패")
    }
  };

  return {
    users, searchUsers, user, user, loginUser, userCnt, searchUserCnt,
    createUser, deleteUser, setLogout, setUser, searchName, updateUser, setLoginUser
  };
}, { persist: true });

//axios로 가져오기