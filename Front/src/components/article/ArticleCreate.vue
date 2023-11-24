<template>
    <div>       
        <fieldset style="text-align: center; width:80%; margin-left:auto; margin-right:auto">
            <legend><h2>기사 작성</h2></legend>
            <br>

            <div>
                <label for="title"><h4>제목</h4></label>
                <input type="text" id="title" v-model="title" style="width: 1000px; height: 30px">
            </div>
            
            <div>
                <label for="writer"><h4>작성자</h4></label>
                <input type="text" id="writer" v-model="writer" style="width: 1000px; height: 30px">
            </div>
            <br>

            <div>
                <textarea id="content" cols="180" rows="30" v-model="content" placeholder=" 내용을 작성해주세요." style="font-size: larger;"></textarea>
            </div>
            <br>

            <div>
                <label for="video"><h4>영상 URL</h4></label>
                <input type="url" id="video" v-model="video" placeholder=" 첨부 파일이 있을 경우 URL를 작성해주세요." style="width: 1000px; height: 30px">
            </div>
            
            <div>
                <label for="media"><h4>언론사</h4></label>
                <input type="text" id="media" v-model="media" style="width: 1000px; height: 30px">
            </div>
           
            <div>
                <label for="category"><h4>카테고리</h4></label>
                <input type="text" id="category" v-model="category" placeholder=" (운동/다이어트/전문가조언 中 택 1)" style="width: 1000px; height: 30px">
            </div>
            <br>

            <div>
                <button class="button" @click.prevent="regist">등록</button>
            </div>
            <br>
        </fieldset>
    </div>
    <br>
</template>

<script setup>
import { ref } from "vue";
import { useArticleStore } from "@/stores/articleStore";
import { useUserStore } from "@/stores/userStore";

const articleStore = useArticleStore()
const userStore = useUserStore()


const title = ref("");
const writer = ref("");
const content = ref("");
const video = ref("");
const media = ref("");
const category = ref("");

const regist = function () {
    console.log("아티클을 등록합니다.")
    const article = {
      articleTitle: title.value,
      articleContent: content.value,
      userId: userStore.loginUserId,
      videoUrl: video.value,
      mediaName: media.value,
      category: category.value,
    };

    console.log(article)
    articleStore.createArticle(article)
}
</script>

<style scoped>
.button {
    display: inline-block;
    padding: 8px 15px;
    font-size: 15px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    outline: none;
    color: #fff;
    background-color: #04AA6D;
    border: none;
    border-radius: 15px;
    box-shadow: 0 5px #999;
  }
  
  .button:hover {background-color: #3e8e41}
  
  .button:active {
    background-color: #3e8e41;
    box-shadow: 0 3px #666;
    transform: translateY(4px);
  }
  </style>
