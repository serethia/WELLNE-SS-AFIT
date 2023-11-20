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

  const getArticleList = function () {

    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

    console.log('토큰 정보')
    console.log(accessToken.value);

    console.log('위 토큰으로 axios get 요청을 합니다.')

    axios.get(`${REST_ARTICLE_API}/article`,
    {
      headers: {
          "access-token": accessToken.value  // 세션에서 해당 토큰 가져오기 (헤더)
      }
   })
    .then((response) => {
      console.log(response.data)
      articleList.value = response.data
      })
      .catch((e)=>{
        console.log('article list 가져오기 실패')
      })
  }
  const getArticleListByCategory = function (category) {

    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

    console.log('토큰 정보')
    console.log(accessToken.value);

    console.log('위 토큰으로 axios get 요청을 합니다.')

    axios.get(`${REST_ARTICLE_API}/article?category=${category}`,
    {
      headers: {
          "access-token": accessToken.value  // 세션에서 해당 토큰 가져오기 (헤더)
      }
   })
    .then((response) => {
      console.log(response.data)
      articleList.value = response.data
      })
      .catch((e)=>{
        console.log('article list 가져오기 실패')
      })
  }


  //게시글 한개
  const article = ref([])
  const getArticle = function (articleId) {
    console.log('aaab')

    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

    axios.get(`${REST_ARTICLE_API}/article/${articleId}`,
    {
      headers: {
          "access-token": accessToken.value  // 세션에서 해당 토큰 가져오기 (헤더)
      }
    })
      .then((response) => {
      article.value = response.data
    })
  }

  //게시글 등록
  const createArticle = function (article) {
    console.log('aaac')
    console.log(article)

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
      .then((res) => {
        console.log(res.data)
        const currentCategory = categoryMap[category.value];
        console.log(category.value)
        console.log("카테고리이동")
        console.log(currentCategory)
        router.push({ name: 'category', params: { category: currentCategory }})
      })
      .catch((err) => {
      console.log(err)
    })
  }

  const updateArticle = function (articleId) {
    console.log('aaad')
    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;
    axios.put(`${REST_ARTICLE_API}/article/${articleId}`, article.value,
    {
      headers: {
          "access-token": accessToken.value 
      }
    })
      .then(() => {
        // const currentCategory = categoryMap[category.value];
        router.push({ name: 'category', params: { category: "exercise"}})
    })
  }

  const searchArticleList = function (searchCondition) {
    console.log('aaae')
    axios.get(`${REST_ARTICLE_API}/article`, {
      params: searchCondition
    })
      .then((res) => {
        articleList.value = res.data
    })
  }

  const deleteArticle = function (articleId) {

    

    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

    axios.delete(`${REST_ARTICLE_API}/article/${articleId}`,
    {
      headers: {
          "access-token": accessToken.value 
      }
    })
      .then((res) => {
        
        console.log("deletdata")
        console.log(res.data)
        // const currentCategory = categoryMap[category.value];
        router.push({ name: 'category', params: { category: "exercise" }})
      })
  }








  return { articleList, getArticleList, getArticleListByCategory, article, getArticle, createArticle, updateArticle, searchArticleList, deleteArticle }

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