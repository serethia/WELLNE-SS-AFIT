<template>
    <div>
        <fieldset style="text-align: center; width:80%; margin-left:auto; margin-right:auto">
            <legend><h2>기사 수정</h2></legend>
            <br>

            <div>
                <label for="title"><h4>제목</h4></label>
                <input type="text" id="title" v-model="articleStore.article.articleTitle" style="width: 1000px; height: 30px">
            </div>
            
            <div>
                <label for="writer"><h4>작성자</h4></label>
                <input type="text" id="writer" readonly v-model="articleStore.article.userId" style="width: 1000px; height: 30px">
            </div>
            <br>

            <div>
                <textarea id="content" cols="180" rows="30" v-model="articleStore.article.articleContent" style="font-size: larger;"></textarea>
            </div>
            <br>

            <div>
                <label for="video"><h4>영상 URL</h4></label>
                <input type="url" id="video" v-model="articleStore.article.videoUrl" style="width: 1000px; height: 30px">
            </div>
            
            <div>
                <label for="media"><h4>언론사</h4></label>
                <input type="text" id="media" v-model="articleStore.article.mediaName" style="width: 1000px; height: 30px">
            </div>
           
           <div>
               <label for="category"><h4>카테고리</h4></label>
                <input type="text" id="category" v-model="articleStore.article.category" style="width: 1000px; height: 30px">
            </div>
            <br>

            <div>
                <button class="btn" @click="updateArticle"><span>수정</span></button>
            </div>
        </fieldset>
    </div>
</template>

<script setup>
import { useArticleStore } from "@/stores/articleStore";


const articleStore = useArticleStore()

const updateArticle = function () {
    articleStore.updateArticle(articleStore.article.articleId)
}
</script>

<style scoped>
.btn {
  display: inline-block;
  border-radius: 4px;
  background-color: #f4511e;
  border: none;
  color: #FFFFFF;
  text-align: center;
  font-size: 13px;
  padding: 10px;
  width: 80px;
  transition: all 0.5s;
  cursor: pointer;
  margin: 5px;
}

.btn span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.btn span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.btn:hover span {
  padding-right: 25px;
}

.btn:hover span:after {
  opacity: 1;
  right: 0;
}
</style>