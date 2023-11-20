<!-- <template>
    <div class="container">
      <h2>Login</h2>
      <fieldset class="text-center">
        <label for="id">아이디</label>
        <input type="text" id="id" v-model="id" class="view" /><br />
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" class="view" /><br />
        <button class="btn" @click="login">로그인</button>
      </fieldset>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useUserStore } from "@/stores/userStore";
  
  const userStore = useUserStore();
  
  const id = ref("");
  const password = ref("");
  
  // 수정함
  const login = async () => {
  const user = {
    userId: id.value,
    userPwd: password.value,
  };

  console.log("Before login:", userStore.resultRef);

  try {
    const resultRef = await userStore.setLoginUser(user);

    console.log("After login:", resultRef);

    if (!resultRef) {
      console.log("Login resultRef is undefined");
    } else {
      const result = resultRef._value;
      if (result === undefined) {
        console.log("Login result is undefined");
      } else {
        console.log("Login result:", result);
      }
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};
  </script>
  
  <style></style> -->



  <!-- 재수정 -->
  <template>
    <div class="container">
      <h2>Login</h2>
      <fieldset class="text-center">
        <label for="id">아이디</label>
        <input type="text" id="id" v-model="id" class="view" /><br />
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" class="view" /><br />
        <button class="btn" @click="login">로그인</button>
      </fieldset>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useUserStore } from "@/stores/userStore";
  
  const userStore = useUserStore();
  
  const id = ref("");
  const password = ref("");
  
  // const login = async () => {
  //   const user = {
  //     userId: id.value,
  //     userPwd: password.value,
  //   };
  
  //   console.log("Before login:", userStore.resultRef);
  
  //   try {
  //     const resultRef = await userStore.setLoginUser(user);
  
  //     console.log("After login:", resultRef);
  
  //     if (!resultRef) {
  //       console.log("Login resultRef is undefined");
  //     } else {
  //       const result = resultRef._value;
  //       if (result === undefined) {
  //         console.log("Login result is undefined");
  //       } else {
  //         console.log("Login result:", result);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //   }
  // };

  // 수정함
  const login = async () => {
  const user = {
    userId: id.value,
    userPwd: password.value,
  };

  console.log("Before login:", userStore.resultRef);

  try {
    const result = await userStore.setLoginUser(user);

    console.log("After login:", result);

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
  
  <style></style>