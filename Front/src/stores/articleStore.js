import {defineStore} from 'pinia'
import {ref , computed} from 'vue'
import router from '@/router'
import axios from 'axios'

const REST_ARTICLE_API = `http://localhost:8080/articleapi`

export const useArticleStore = defineStore('article', ()=>{
  const articleList = ref([])
  const accessToken = ref('')

  const getArticleList = function () {

    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

    axios.get(`${REST_ARTICLE_API}/article`,
    {
      headers: {
          "access-token": accessToken.value  // 세션에서 해당 토큰 가져오기 (헤더)
      }
   })
    .then((response) => {
      articleList.value = response.data
      })
      .catch((e)=>{
        console.log('article list 가져오기 실패')
      })
  }

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


  //게시글 한개
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

  //게시글 등록
  const createArticle = function (article) {

    axios({
      url: `${REST_ARTICLE_API}/article`,
      method: 'POST',
      
      headers: {
        "Content-Type": "application/json"
      },
      data: article
    })
      .then(() => {
        
        router.push({ name: 'articleList'})
      })
      .catch((err) => {
      console.log(err)
    })
  }

  const updateArticle = function () {

    axios.put(`${REST_ARTICLE_API}/article`, article.value)
      .then(() => {
      router.push({name: 'articleList'})
    })
  }

  const searchArticleList = function (searchCondition) {

    axios.get(`${REST_ARTICLE_API}/article`, {
      params: searchCondition
    })
      .then((res) => {
        articleList.value = res.data
    })
  }


  return { articleList, getArticleList, getArticleListByCategory, article, getArticle, createArticle, updateArticle, searchArticleList }

    // const computeFavorites = computed(()=>{
    //     return productList.value.filter(pro => pro.isFavorite)
    // })

    // const clickFavorite = function(name) {
    //     productList.value = productList.value.map((product) => {
    //         if(name === product.name) {
    //             product.isFavorite = !product.isFavorite
    //         }
    //         return product
    //     })
    // }


    // return {productList, computeFavorites, clickFavorite}
    
}, { persist: {
    storage: sessionStorage }})