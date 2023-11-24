  <template>
    <div class="container">
      <h2>Login</h2>
      <br>
      <fieldset class="text-center" style="width: 90%; margin-left: auto; margin-right: auto">
        <label for="id">아이디</label>
        <input type="text" id="id" v-model="id" class="view" /><br />
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" class="view" /><br />
        <button class="btn" @click="login">로그인</button>
      </fieldset>
      <br>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useUserStore } from "@/stores/userStore";
  
  const userStore = useUserStore();
  
  const id = ref("");
  const password = ref("");

  const login = async () => {
    const user = {
      userId: id.value,
      userPwd: password.value,
    };

    try {
      // await는 async (비동기) 함수 안에서만 쓸수 있음.
      // await : 프라미스(비동기, 시간이 걸림)를 값으로 바꿔줌 - 기다림.
      const result = await userStore.setLoginUser(user);

      if (result.success) {
        console.log("Login result:", result.data);
      } else {
        console.log("Login failed:", result.error);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  </script>
  
<style scoped>
.btn {
  display: inline-block;
  padding: 8px 12px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #04AA6D;
  border: none;
  border-radius: 15px;
  box-shadow: 0 5px #999;
}

.btn:hover {background-color: #3e8e41}

.btn:active {
  background-color: #3e8e41;
  box-shadow: 0 3px #666;
  transform: translateY(4px);
}
</style>