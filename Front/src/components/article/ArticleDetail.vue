<template>
    <div>
        <p>기사 정보들 쭉 나열하기</p>
        <CommentList />
    </div>
  </template>
  
  <script setup>
    import { onMounted, ref } from "vue";
    import { useArticleStore } from "@/stores/articleStore";
    import CommentList from "@/components/comment/CommentList.vue";


  </script>
  
  <style scoped>
  
  </style>