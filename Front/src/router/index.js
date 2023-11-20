import { createRouter, createWebHistory } from 'vue-router';
import CategoryView from "@/views/CategoryView.vue"  // 카테고리별 기사 목록 view
import MyView from "@/views/MyView.vue";  // 마이페이지 view
import UserView from "@/views/UserView.vue";  // 관리자만 보이도록 설정_회원 정보 조회용 view

// 카테고리별로 다르게 기사를 보여줄 때는 태그를 이용해 보여주고 숨기기
// ArticleDetail 안에서 댓글 component 보여주기
import ArticleCreate from "@/components/article/ArticleCreate.vue";
import ArticleDetail from "@/components/article/ArticleDetail.vue";
import ArticleList from "@/components/article/ArticleList.vue";
import ArticleUpdate from "@/components/article/ArticleUpdate.vue";

// 로그인 형식
import LoginForm from "@/components/LoginForm.vue";

// 관리자만 볼 수 있는 회원 정보 조회
import UserList from "@/components/user/UserList.vue";
import UserRegist from "@/components/user/UserRegist.vue";
import UserDetail from "@/components/user/UserDetail.vue";

const routes = [
  {
    path: '/category/:category',
    name: 'Category',
    component: CategoryView,
  },
  {
    path: '/article',
    name: 'ArticleList',
    component: ArticleList,
  },
  {
    path: '/article-create',
    name: 'ArticleCreate',
    component: ArticleCreate,
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: ArticleDetail,
  },
  {
    path: '/article-update',
    name: 'ArticleUpdate',
    component: ArticleUpdate,
  },
  {
    path: '/',
    name: 'My',
    component: MyView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/user/:id",
    name: "UserDetail",
    component: UserDetail,
  },
  {
    path: "/user",
    name: "UserList",
    component: UserList,
  },
  {
    path: "/user/regist",
    name: "UserRegist",
    component: UserRegist,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router
