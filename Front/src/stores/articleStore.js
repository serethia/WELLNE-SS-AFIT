import { ref , computed } from "vue";
import { defineStore } from "pinia";
import router from "@/router";  // router.push로 창 전환 가능
import axios from "axios";


const articleURL = 'http://localhost:8080/articleapi'


export const useArticleStore = defineStore("article", ()=>{


    const articles = ref([]);
    const article = ref(null);
    



    // // 모든 기사 조회 (카테고리 별)
    // const getArticles(파라미터도 넣어주기) => {
    //     axios.


    //     마저 작성하기



    // };
    
    return {articles, article,};
    // getArticles};  작성 후에는 주석 풀고 return 안에 포함해주기

}, { persist: {
    storage: sessionStorage }})