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
        <br>
        <fieldset class="checkbox-container" style="width:40%;">
          <legend >관심사</legend>
            <div class="checkbox-group"> <!-- 체크박스 선택한 data가 회원 정보로 -->
              <div v-for="info in infos" :key="info.category" style="display:inline-flex">
                <input type="checkbox" :id="info.category" :value="info.category" v-model="selectedCategories" class="view" />
                <label :for="info.category">{{ info.category }}</label>
                <br>
              </div>
             </div>  
        </fieldset>
        <br>
        <fieldset class="role-container">
          <legend>역할</legend>
            <div class="radio-group"> <!-- 라디오 선택한 data가 회원 정보로 -->
              <input type="radio" id="normalUser" value="0" v-model="role" class="view" />
              <label for="normalUser">일반 회원</label>

              <input type="radio" id="journalist" value="1" v-model="role" class="view" />
              <label for="journalist">기자</label>

              <input type="radio" id="administrator" value="2" v-model="role" class="view" />
              <label for="administrator">관리자</label>
            </div>
        </fieldset>
        <br>
        <button class="btn" @click="regist"><span>등록</span></button>
      </fieldset>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from "vue";
  import { useUserStore } from "@/stores/userStore";
  const userStore = useUserStore();
  
  // 체크박스 구현
  /* isSelected: 체크 박스 체크 여부 */
  const infos = ref([
    {category: "운동", isSelected: false},
    {category: "다이어트", isSelected: false},
    {category: "전문가조언", isSelected: false},
  ]);
  const selectedCategories = ref([]);
    
  const id = ref("");
  const password = ref("");
  const password2 = ref("");
  const name = ref("");
  const email = ref("");
  const nickname = ref("");
  const role = ref(0); // Default role is set to 0 (일반인)

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
      category: selectedCategories.value.join(','),  // 카테고리 추가, ','로 나열
      role: role.value
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

.role-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
  margin: 0 auto;
}

.role-container > div {
  display: inline-flex;
  align-items: center;
  margin-bottom: 10px;
}

.radio-group label {
  white-space: nowrap;
}

.btn {
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 18px;
  padding: 10px;
  width: 100px;
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