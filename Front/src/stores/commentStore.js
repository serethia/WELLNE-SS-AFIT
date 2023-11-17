import { ref } from "vue";
import { defineStore } from "pinia";
import router from "@/router";
import axios from "axios";


const URL = 'http://localhost:8080/articleapi'


export const useCommentStore = defineStore("comment", () => {

  
  const comments = ref([]);

  const comment = ref(null);


//아직 안 고침

  // 댓글 등록
  const writeComment = (comment) => {
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


  // 댓글 삭제
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


  // 댓글 수정
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


  // 모든 댓글 조회
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
