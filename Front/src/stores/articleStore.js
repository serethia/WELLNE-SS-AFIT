import {defineStore} from 'pinia'
import {ref , computed} from 'vue'
import router from '@/router'
import axios from 'axios'

const REST_ARTICLE_API = `http://localhost:8080/articleapi`

const categoryMap = {
  '다이어트': 'diet',
  '운동': 'exercise',
  '전문가조언': 'advice'
}

export const useArticleStore = defineStore('article', ()=>{
  const articleList = ref([])
  const accessToken = ref('')


  // const getArticleList = function () {
  //   const storeObj = JSON.parse(sessionStorage.getItem('user'));
  //   accessToken.value = storeObj.accessToken;

  //   axios.get(`${REST_ARTICLE_API}/article`,
  //   {
  //     headers: {
  //         "access-token": accessToken.value 
  //     }
  //  })
  //   .then((response) => {
  //     articleList.value = response.data
  //     })
  //     .catch((e)=>{
  //       console.log('article list 가져오기 실패')
  //     })
  // }


  // 카테고리 별 리스트 불러오기
  const getArticleListByCategory = function (category) {
    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

    axios.get(`${REST_ARTICLE_API}/article?category=${category}`,
    {
      headers: {
          "access-token": accessToken.value 
      }
   })
    .then((response) => {
      articleList.value = response.data
      })
      .catch((e)=>{
        console.log('article list 가져오기 실패')
      })
  }


  //기사 한개 불러오기
  const article = ref([])
  const getArticle = function (articleId) {
    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

    axios.get(`${REST_ARTICLE_API}/article/${articleId}`,
    {
      headers: {
          "access-token": accessToken.value 
      }
    })
      .then((response) => {
      article.value = response.data
    })
  }


  //기사 등록
  const createArticle = function (article) {
    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

    axios({
      url: `${REST_ARTICLE_API}/article`,
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "access-token": accessToken.value
      },
      data: article
    })
      .then(() => {
        const currentCategory = categoryMap[category.value];
        router.push({ name: 'category', params: { category: currentCategory }})
      })
      .catch((err) => {
      console.log(err)
    })
  }


  //기사 수정
  const updateArticle = function ( articleId ) {
    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

    axios.put(`${REST_ARTICLE_API}/article/${articleId}`, article.value,
    {
      headers: {
          "access-token": accessToken.value 
      }
    })
      .then(() => {
        router.push({ name: 'articleDetail', params: { id: articleId }});
    })
    .catch((err) => {
      console.log(err)
    })
  }


  //기사 검색
  const searchArticleList = function (searchCondition) {

    axios.get(`${REST_ARTICLE_API}/article`, {
      params: searchCondition
    })
      .then((res) => {
        articleList.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  }


  //기사 삭제
  const deleteArticle = function (articleId) {
    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;  
    
    axios.get(`${REST_ARTICLE_API}/article/${articleId}`, {
      headers: {
        "access-token": accessToken.value
      }
    })
    .then((response) => {
      const article = response.data;  
      
      axios.delete(`${REST_ARTICLE_API}/article/${articleId}`, {
        headers: {
          "access-token": accessToken.value
        }
      })
      .then(() => {
        const category = categoryMap[article.category];
        router.push({ name: 'category', params: { category: category } });
      })
      .catch((err) => {
        console.log(err);
      });
    })
    .catch((err) => {
      console.log(err);
    });
  };


  return { articleList, getArticleListByCategory, article, getArticle, createArticle, updateArticle, searchArticleList, deleteArticle }


}, { persist: {
    storage: sessionStorage }})