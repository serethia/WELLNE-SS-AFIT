<template>
    <div class="container">
      <h2>회원 가입</h2>
      <fieldset class="text-center">
        <label for="id">아이디</label>
        <input type="text" id="id" v-model="id" class="view" /><br />
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" class="view" /><br />
        <label for="password">비밀번호 확인</label>
        <input type="password" id="password2" v-model="password2" class="view" /><br />
        <label for="name">이름</label>
        <input type="text" id="name" v-model="name" class="view" /><br />
        <label for="email">이메일</label>
        <input type="email" id="email" v-model="email" class="view" /><br />
        <label for="nickname">별명</label>
        <input type="text" id="nickname" v-model="nickname" class="view" /><br />
        <fieldset class="checkbox-container" style="width:40%;">
        <legend >관심사</legend>
        <div class="checkbox-group"> <!-- 아직 체크박스 선택한 data가 회원 정보로 넘어가지 않고 있음 -->
        <div v-for="info in infos" :key="info.category" style="display:inline-flex">
          <input type="checkbox" :id="info.category" v-model="info.isSelected" class="view" />
          <label :for="info.category">{{ info.category }}</label>
          <br>
        </div>
        </div>
        </fieldset>
        <button class="btn" @click="regist">등록</button>
      </fieldset>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useUserStore } from "@/stores/userStore";
  const userStore = useUserStore();
  
  // 체크박스 구현
  /* isSelected: 체크 박스 체크 여부 */
  const selectedcategory = ref([]);
  const infos = ref([
    {category: "운동", isSelected: false},
    {category: "다이어트", isSelected: false},
    {category: "전문가조언", isSelected: false},
  ]);
    
  const id = ref("");
  const password = ref("");
  const password2 = ref("");
  const name = ref("");
  const email = ref("");
  const nickname = ref("");

  const users = computed(() => userStore.users);

  onMounted(() => {
    userStore.setUsers();
  });
  
  const isEmailValid = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    return re.test(String(email).toLowerCase());
  };

  const isPasswordValid = (pwd) => {
    return pwd.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/g.test(pwd);
  };

  const regist = () => {

    if (
      id.value === "" ||
      password.value === "" ||
      name.value === "" ||
      email.value === "" || 
      nickname.value === ""
    ) {
      alert("모든 내용을 입력해주세요.");
      return;
    }
  
    if (password.value !== password2.value) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!isPasswordValid(password.value)) {
      alert("비밀번호는 8자리 이상이며, 특수문자를 포함해야 합니다.");
      return;
    }

    if (Array.isArray(users.value) && users.value.length > 0) {
      const userExists = users.value.some((user) => user.id === id.value);
      if (userExists) {
        alert("이미 존재하는 아이디입니다.");
        return;
      }
    }

    if (!isEmailValid(email.value)) {
      alert("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    const user = {
      userId: id.value,
      userPwd: password.value,
      userName: name.value,
      email: email.value,
      nickname: nickname.value,
      img: "#",
      // category: selectedcategory.value
      };
  
    userStore.createUser(user);
  };
  </script>

<style scoped>
.checkbox-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}

.checkbox-container > div {
  display: inline-flex;
  align-items: center;
  margin-bottom: 10px;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.checkbox-group > div {
  display: inline-flex;
  align-items: center;
}

.checkbox-group label {
  white-space: nowrap;
}

</style>