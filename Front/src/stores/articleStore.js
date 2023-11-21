import {defineStore} from 'pinia'
import {ref , computed} from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
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
  const route = useRoute();

  // const getArticleList = function () {

  //   const storeObj = JSON.parse(sessionStorage.getItem('user'));
  //   accessToken.value = storeObj.accessToken;

  //   console.log('토큰 정보')
  //   console.log(accessToken.value);

  //   console.log('위 토큰으로 axios get 요청을 합니다.')

  //   axios.get(`${REST_ARTICLE_API}/article`,
  //   {
  //     headers: {
  //         "access-token": accessToken.value  // 세션에서 해당 토큰 가져오기 (헤더)
  //     }
  //  })
  //   .then((response) => {
  //     console.log(response.data)
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


  //기사 한개 불러오기
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

  //기사 등록
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


  //기사 수정
  const updateArticle = function ( articleId ) {
    console.log('aaad')
    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;
    axios.put(`${REST_ARTICLE_API}/article/${articleId}`, article.value,
    {
      headers: {
          "access-token": accessToken.value 
      }
    })
      .then((res) => {
        console.log(res.data)
        router.push({ name: 'articleDetail', params: { id: articleId }});
    })
    .catch((err) => {
      console.log(err)
    })
  }


  //기사 검색
  const searchArticleList = function (searchCondition) {
    console.log('aaae')
    console.log(searchCondition);
    console.log(route.params.category);

    const storeObj = JSON.parse(sessionStorage.getItem('user'));
    accessToken.value = storeObj.accessToken;

    axios.get(`${REST_ARTICLE_API}/search`, {
      params: {
        category: route.params.category,
        key: searchCondition.key,
        word: searchCondition.word,
        orderBy: searchCondition.orderBy,
        orderByDir: searchCondition.orderByDir

      },
      headers: {
        "access-token": accessToken.value
      }
    })
      .then((res) => {
        console.log(res.data);
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
      .then((res) => {
        console.log("delete data:", res.data);
        console.log("article:", article);
        
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