import { ref } from "vue";
import { defineStore } from "pinia";
import router from "@/router";
import axios from "axios";
import { Base64 } from 'js-base64';


const URL = 'http://localhost:8080/userapi'


export const useUserStore = defineStore("user", () => {

  // 로그인 여부 확인용 T/F 변수 선언
  const isLoggedIn = ref(false);  // 로그인 성공 시 true로, 로그아웃 시 다시 false로
  
  const users = ref([]);
  const searchUsers = ref([]);

  const user = ref(null);

  const userCnt = ref(0);
  const searchUserCnt = ref(0);

  const accessToken = ref("");
  const loginUserId = ref("");
  const loginUserNickname = ref("");
  const loginUserRole = ref(0);


  // 회원가입
  const createUser = (user) => {
    axios.post(`${URL}/signup`, user,
        {
            headers: {
                "access-token": accessToken.value
            }
        })
        .then((res) => {
            users.value.push(res.data);
            userCnt.value = users.value.length;
            router.push({name: 'UserList'});
        })
  };


  // 회원 삭제
  const deleteUser = (userid) => {
    axios.delete(`${URL}/user/${userid}`,
      {
          headers: {
              "access-token": accessToken.value
          }
      })
      .then(() => {
          users.value = users.value.filter(u => u.userId !== userid);
          userCnt.value = users.value.length;
          router.push({name: 'UserList'});
      })
  };


  // 로그아웃
  const setLogout = () => {
    isLoggedIn.value = false;  
    accessToken.value = "";
    router.push({name: 'My'});
  };


  // 특정 회원 조회
  const setUser = (userid) => {
    axios.get(`${URL}/user/${userid}`,
    {
        headers: {
            "access-token": accessToken.value
        }
    })
        .then((res) => {
            user.value = { ...res.data };
        })
  };


  // 회원 이름 검색
  const searchName = (username) => {
    axios.get(`${URL}/user/search`, {params:{key: "user_name" , word: username}, headers: {
            "access-token": accessToken.value
        }})
        .then((res) => {
            searchUsers.value = res.data;
            searchUserCnt.value = searchUsers.value.length;
        })
        .catch(() => {
            alert("검색 대상을 찾지 못했습니다.");
        })
  };


  // 회원 정보 수정
  const updateUser = () => {
    axios.put(`${URL}/user`, user.value, 
      {
        headers:{
            "access-token": accessToken.value
        }
     })
     .then(() => {
        // 기존 사용자 정보 업데이트
        const index = users.value.findIndex(u => u.userId === user.value.userId);
        if (index !== -1) {
          users.value[index] = { ...user.value };
        }
        router.push({ name: 'UserList' });
      })
  };


  // 토큰 + 로그인
  // setLoginUser 함수를 async로 만들었음
  // 비동기 함수는 값을 반환하는 것이 아니라, 값을 프라미스로 감싸서 프라미스를 반환
  const setLoginUser = async (loginuser) => {
    try {
      // axios는 항상 프라미스를 반환

      const res = await axios.post(`${URL}/login`, loginuser);
      const token = res.data;
      accessToken.value = token;
      
      // axios.defaults.headers.common['access-token'] = token; // 전역 설정
      

      // atob() : Base64로 인코딩된 문자열 => json문자열(한글은 깨짐)
      // Base64.decode(): Base64로 인코딩된 문자열 => json문자열(한글도 안깨지도록)
      // Base64: import { Base64 } from 'js-base64';
      // npm i js-base64

      const payload = token.split('.')[1];
      const obj = JSON.parse(Base64.decode(payload));
  
      loginUserId.value = obj.id;
      loginUserNickname.value = obj.nickname;
      loginUserRole.value = obj.role;
      isLoggedIn.value = true;

      router.push({ name: 'My' });
      return { success: true, data: token };
    } catch (error) {
      alert("로그인 실패!");
      return { success: false, error: error.message };
    }
  };

//   const setLoginUser = (loginuser) => {
//     axios.post(`${URL}/login`, loginuser)
//         .then((res) => {
//             console.log("되고 있나?");
//             console.log(res.data);
//             accessToken.value = res.data;
//             axios.defaults.headers.common['access-token'] = res.data; // 토큰 전역 설정
//             const payload = JSON.parse(Base64.decode(res.data.split('.')[1]));
//             loginUserId.value = payload.id;
//             loginUserNickname.value = payload.nickname;
//             isLoggedIn.value = true;
//             console.log(loginUserId.value);  // 수정된 부분
//             console.log(loginUserNickname.value);  // 수정된 부분
//             router.push({ name: 'My' });
//         })
//         .catch(() => {
//             alert("로그인 실패!");
//         });
// };


//   const setLoginUser = async (loginuser) => {

//     axios.post(`${URL}/login`, loginuser)
//     .then((res) => {
//         console.log("되고 있나?");
//         console.log(res.data);
//         accessToken.value = res.data;
//         axios.defaults.headers.common['access-token'] = res.data; // 토큰 전역 설정
//         return res.data;
//     })
//     .then((token) => {
//         console.log("되고 있나?2");
//         console.log(token);
//         const payload = JSON.parse(Base64.decode(token.split('.')[1]));
//         loginUserId.value = payload.id;
//         loginUserNickname.value = payload.nickname;
//         isLoggedIn.value = true;
//         console.log(loginUserId);
//         console.log(loginUserNickname);
//         router.push({name: 'My'});
//     })
//     .catch(() => {
//         alert("로그인 실패!");
//     })



    // try{
    //     const res = await axios.post(`${URL}/login`, loginuser);
    //     const token = res.data;
    //     accessToken.value = token;
    //     axios.defaults.headers.common['access-token'] = token; // 토큰 전역 설정
        
    //     const payload = token.split('.')[1];
    //     const obj = JSON.parse(Base64.decode(payload));

    //     loginUserId.value = obj.id;
    //     loginUserNickname.value = obj.nickname;
    //     isLoggedIn.value = true;

    //     console.log(loginUserId); // 테스트용_undefined 문제 해결
    //     console.log(loginUserNickname); // 테스트용_undefined 문제 해결

    //     router.push({name: 'My'});
    // }


    // axios.post(`${URL}/login`, loginuser)
    //     .then((res) => {
    //         console.log("되고 있나?");
    //         console.log(res.data);
    //         accessToken.value = res.data;
    //         axios.defaults.headers.common['access-token'] = res.data; // 토큰 전역 설정
    //         return res.data;
    //     })
    //     .then((token) => {
    //         console.log("되고 있나?2");
    //         console.log(token);
    //         const payload = JSON.parse(Base64.decode(token.split('.')[1]));
    //         loginUserId.value = payload.id;
    //         loginUserNickname.value = payload.nickname;
    //         isLoggedIn.value = true;
    //         console.log(loginUserId);
    //         console.log(loginUserNickname);
    //         router.push({ name: 'My' });
    //         // console.log("되고 있나?2");
    //         // console.log(token);
    //         // const payload = token.split('.')[1];
    //         // const obj = Base64.decode(payload);
    //         // loginUserId.value = obj.id;
    //         // loginUserNickname.value = obj.nickname;
    //         // isLoggedIn.value = true;
    //         // console.log(loginUserId);
    //         // console.log(loginUserNickname);
    //         // router.push({name: 'My'});
    //     })


        //     // const token = res.data.split('.');  // token을 '.'을 기준으로 따로 3등분해서 배열로 저장
        //     isLoggedIn.value= true;
        //     // loginUser.value = res.data;
        //     token = res.data;
        //     payload = token.split('.')[1];
        //     obj = Base64.decode(payload);
        //     loginUserId.value = obj.id;
        //     loginUserNickname.value = obj.nickname;
        //     console.log(obj);
        //     router.push({name: 'My'});
        // })


//         .catch(() => {
//           alert("로그인 실패!");
//         })
//   };


  // 모든 회원 조회
  const setUsers = () => {
    axios.get(`${URL}/user`,
        {
            headers: {
                "access-token": accessToken.value
            }
        })
        .then((res) => {
            users.value = res.data;
        })
  };


  return {accessToken, isLoggedIn, users, searchUsers, user, loginUserId, loginUserNickname, loginUserRole, userCnt, searchUserCnt, 
    createUser, deleteUser, setLogout, setUser, searchName, updateUser, setLoginUser, setUsers};

}, { persist: {
    storage: sessionStorage }});
