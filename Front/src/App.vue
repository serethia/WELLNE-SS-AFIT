<template>
    <div>
        <TheHeaderNav />
        <RouterView />
        <Footer ></Footer>
    </div>
</template>

<script setup>
import TheHeaderNav from '@/components/common/TheHeaderNav.vue';
import Footer from '@/components/common/Footer.vue';
</script>

<style  scoped></style>
