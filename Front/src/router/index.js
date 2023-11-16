import { createRouter, createWebHistory } from 'vue-router';
import ArticleView from "@/views/ArticleView.vue";  // 기사 + 영상 + 댓글 view
import MyView from "@/views/MyView.vue";  // 마이페이지 view
import UserView from "@/views/UserView.vue";  // 관리자만 보이도록 설정: 회원 정보 조회용 view

// 카테고리별로 다르게 기사를 보여줄 때는 태그를 이용해 보여주고 숨기기
import ArticleCreate from "@/components/article/ArticleCreate.vue";
import ArticleDetail from "@/components/article/ArticleDetail.vue";
import ArticleList from "@/components/article/ArticleList.vue";
import ArticleUpdate from "@/components/article/ArticleUpdate.vue";

// ArticleView의 기사 component 하단에 댓글 component 추가
import CommentCreate from "@/components/comment/CommentCreate.vue";
import CommentDetail from "@/components/comment/CommentDetail.vue";
import CommentList from "@/components/comment/CommentList.vue";
import CommentUpdate from "@/components/comment/CommentUpdate.vue";

// 마이페이지
import MyBookmarkList from "@/components/my/MyBookmarkList.vue";
import MyFollowingList from "@/components/my/MyFollowingList.vue";
import MyProfile from "@/components/my/MyProfile.vue";

// 로그인 형식
import LoginForm from "@/components/LoginForm.vue";

// 관리자만 볼 수 있는 회원 정보 조회
import UserList from "@/components/user/UserList.vue";
import UserRegist from "@/components/user/UserRegist.vue";
import UserDetail from "@/components/user/UserDetail.vue";


import CategoryView from "@/views/CategoryView.vue"

const routes = [
  {
    path: '/category/:category',
    name: 'Category',
    component: CategoryView
  },
  {
    path: '/',
    name: 'My',
    component: MyView,
    children: [
      {
        path: '',
        name: 'MyBookmarkList',
        component: MyBookmarkList,
      },
      {
        path: '',
        name: 'MyFollowingList',
        component: MyFollowingList,
      },
      {
        path: '',
        name: 'MyProfile',
        component: MyProfile,
      },
    ],
  },
  {
    path: '/article',
    name: 'Article',
    component: ArticleView,
    children: [
      {
        path: '',
        name: 'ArticleList',
        component: ArticleList,
      },
      {
        path: 'create',
        name: 'ArticleCreate',
        component: ArticleCreate,
      },
      {
        path: ':id',
        name: 'ArticleDetail',
        component: ArticleDetail,
      },
      {
        path: 'update',
        name: 'ArticleUpdate',
        component: ArticleUpdate,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/user",
    name: "User",
    component: UserView,
    children: [
      {
        path: ":id",
        name: "UserDetail",
        component: UserDetail,
      },
      {
        path: "",
        name: "UserList",
        component: UserList,
      },
      {
        path: "regist",
        name: "UserRegist",
        component: UserRegist,
      },
    ],
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router
