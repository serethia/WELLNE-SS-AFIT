import { createRouter, createWebHistory } from 'vue-router';
import AdviceView from "@/views/AdviceView.vue";
import DietView from "@/views/DietView.vue";
import ExerciseView from "@/views/ExerciseView.vue";
import HomeView from "@/views/HomeView.vue";
import UserView from "@/views/UserView.vue";

import ExerciseCreate from "@/components/exercise/ExerciseCreate.vue";
import ExerciseDetail from "@/components/exercise/ExerciseDetail.vue";
import ExerciseList from "@/components/exercise/ExerciseList.vue";
import ExerciseUpdate from "@/components/exercise/ExerciseUpdate.vue";

import DietCreate from "@/components/diet/DietCreate.vue";
import DietDetail from "@/components/diet/DietDetail.vue";
import DietList from "@/components/diet/DietList.vue";
import DietUpdate from "@/components/diet/DietUpdate.vue";

import AdviceCreate from "@/components/advice/AdviceCreate.vue";
import AdviceDetail from "@/components/advice/AdviceDetail.vue";
import AdviceList from "@/components/advice/AdviceList.vue";
import AdviceUpdate from "@/components/advice/AdviceUpdate.vue";

import LoginForm from "@/components/LoginForm.vue";
import UserList from "@/components/user/UserList.vue";
import UserRegist from "@/components/user/UserRegist.vue";
import UserDetail from "@/components/user/UserDetail.vue";

// 추후 components를 하나로 줄여서 카테고리 분류 버튼을 사용할 지 진행에 따라 다시 의논해볼 예정

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/exercise',
    name: 'Exercise',
    component: ExerciseView,
    children: [
      {
        path: "",
        name: "ExerciseList",
        component: ExerciseList,
      },
      {
        path: "create",
        name: "ExerciseCreate",
        component: ExerciseCreate,
      },
      {
        path: ":id",
        name: "ExerciseDetail",
        component: ExerciseDetail,
      },
      {
        path: "update",
        name: "ExerciseUpdate",
        component: ExerciseUpdate,
      },
    ],
  },
  {
    path: '/diet',
    name: 'Diet',
    component: DietView,
    children: [
      {
        path: "",
        name: "DietList",
        component: DietList,
      },
      {
        path: "create",
        name: "DietCreate",
        component: DietCreate,
      },
      {
        path: ":id",
        name: "DietDetail",
        component: DietDetail,
      },
      {
        path: "update",
        name: "DietUpdate",
        component: DietUpdate,
      },
    ],
  },
  {
    path: '/advice',
    name: 'Advice',
    component: AdviceView,
    children: [
      {
        path: "",
        name: "AdviceList",
        component: AdviceList,
      },
      {
        path: "create",
        name: "AdviceCreate",
        component: AdviceCreate,
      },
      {
        path: ":id",
        name: "AdviceDetail",
        component: AdviceDetail,
      },
      {
        path: "update",
        name: "AdviceUpdate",
        component: AdviceUpdate,
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
