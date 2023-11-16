<template>
    <div>
        <h2>카테고리명마다 바꿔주기~~</h2>
        <p>카테고리 뷰:{{ routeName }}</p>
    </div>
</template>

<script setup>
import {useRoute} from 'vue-router';
import { onMounted, watch, ref } from 'vue';

const route = useRoute();
const routeName = ref('')

onMounted(()=>{
    console.log(route.params.category)
    routeName.value = route.params.category
})

watch(route, (newVal)=>{
    console.log(newVal.params.category);
    routeName.value = newVal.params.category

})



</script>

<style scoped>

</style>