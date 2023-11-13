<template>
    <div id="container">
        <header>
            <nav>
                <RouterLink to="/">홈</RouterLink>&nbsp; &nbsp; &nbsp; &nbsp; 
                <RouterLink to="/exercise">운동</RouterLink>&nbsp; &nbsp; &nbsp; &nbsp; 
                <RouterLink to="/diet">다이어트</RouterLink>&nbsp; &nbsp; &nbsp; &nbsp; 
                <RouterLink to="/advice">건강칼럼</RouterLink>
            </nav>
        </header>
    </div>
</template>

<script setup>

</script>

<style  scoped>
#container {
    text-align: center;
}

nav {
    padding: 30px
}

nav a {
    font-weight: bold;
    text-decoration: none;
    color: black;
}

nav a.router-link-exact-active {
    color: #42b983
}
</style>