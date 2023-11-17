import {defineStore} from 'pinia'
import {ref , computed} from 'vue'
import router from '@/router'
import axios from 'axios'

const REST_ARTICLE_API = `http://localhost:8080/articleapi`

export const useArticleStore = defineStore('article', ()=>{
  const articleList = ref([])
  const getArticleList = function () {
    axios.get(REST_ARTICLE_API)
      .then((response) => {
      articleList.value = response.data
      })
  }

  //게시글 한개
  const article = ref({})
  const getArticle = function (id) {
    axios.get(`${REST_ARTICLE_API}/${id}`)
      .then((response) => {
      article.value = response.data
    })
  }

  //게시글 등록
  const createArticle = function (article) {
    axios({
      url: REST_ARTICLE_API,
      method: 'POST',
      //아래꺼 없어도 알아서 보내더라 axios 쵝오~ 
      headers: {
        "Content-Type": "application/json"
      },
      data: article
    })
      .then(() => {
        //response 응답으로 들어온 게시글의 id를 이용해서
        //상세보기로 바로 점프도 가넝이야~~
        router.push({ name: 'articleList'})
      })
      .catch((err) => {
      console.log(err)
    })
  }

  const updateArticle = function () {
    axios.put(REST_ARTICLE_API, article.value)
      .then(() => {
      router.push({name: 'articleList'})
    })
  }

  const searchArticleList = function (searchCondition) {
    axios.get(REST_ARTICLE_API, {
      params: searchCondition
    })
      .then((res) => {
        articleList.value = res.data
    })
  }








  return { articleList, getArticleList, article, getArticle, createArticle, updateArticle, searchArticleList }

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