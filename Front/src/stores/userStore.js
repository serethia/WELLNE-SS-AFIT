import { ref } from "vue";
import { defineStore } from "pinia";
import router from "@/router";
import axios from 'axios';


const URL = 'http://localhost:8080/userapi'


export const useUserStore = defineStore("user", () => {

  // 로그인 여부 확인용 T/F 변수 선언
  const isLoggedIn = ref(false);  // 로그인 성공 시 true로, 로그아웃 시 다시 false로
  
  const users = ref([]);
  const searchUsers = ref([]);

  const user = ref(null);
  const loginUser = ref(null);

  const userCnt = ref(0);
  const searchUserCnt = ref(0);

  const accessToken = ref("");




  // 회원가입
  const createUser = (user) => {
    axios.post(`${URL}/signup`, user,
        {
            headers: {
                "access-token": accessToken.value  // 세션에서 해당 토큰 가져오기 (헤더)
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
          router.push({name: 'UserList'});
      })
  };


  // 로그아웃
  const setLogout = () => {
    isLoggedIn.value = false;  
    //sessionStorage.removeItem('access-token');  // 세션의 토큰 삭제
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
            user.value = res.data;
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
            console.log(searchUserCnt);
            console.log(res.data);
            console.log("검색성공");
        })
        .catch(() => {
            console.log("검색안됨");
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
            setUsers();
            router.push({name: 'UserList'});
        })
  };


  // 토큰 + 로그인
  const setLoginUser = (loginuser) => {
    axios.post(`${URL}/login`, loginuser)
        .then((res) => {
            //sessionStorage.setItem('access-token', res.data);  // 토큰에 response 데이터 저장
            accessToken.value = res.data;
            const token = res.data.split('.');  // token을 '.'을 기준으로 따로 3등분해서 배열로 저장
            isLoggedIn.value= true;
            router.push({name: 'My'});
        })
        .catch(() => {
          alert("로그인 실패!");
        })
  };


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


  return {accessToken, isLoggedIn, users, searchUsers, user, loginUser, userCnt, searchUserCnt, 
    createUser, deleteUser, setLogout, setUser, searchName, updateUser, setLoginUser, setUsers};

}, { persist: {
    storage: sessionStorage }});
