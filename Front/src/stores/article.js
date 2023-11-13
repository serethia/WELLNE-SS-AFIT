import {defineStore} from 'pinia'
import {ref , computed} from 'vue'

export const useArticleStore = defineStore('article', ()=>{
    const articleList = ref([
        {
            
        },
        {
            
        },
        {
           
        },
        {
            
        },
    ])

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
    
}, {persist: true})