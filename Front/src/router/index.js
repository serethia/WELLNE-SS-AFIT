import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ExerciseView from '@/views/ExerciseView.vue'
import DietView from '@/views/DietView.vue'
import AdviceView from '@/views/AdviceView.vue'

import LoginForm from "@/components/LoginForm.vue";
import User from "../views/UserView.vue";
import UserList from "@/components/user/UserList.vue";
import UserRegist from "@/components/user/UserRegist.vue";
import UserDetail from "@/components/user/UserDetail.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/exercise',
    name: 'exercise',
    component: ExerciseView
  },
  {
    path: '/diet',
    name: 'diet',
    component: DietView
  },
  {
    path: '/advice',
    name: 'advice',
    component: AdviceView
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
  },
  {
    path: "/user",
    component: User,
    children: [
      {
        path: "regist",
        name: "Regist",
        component: UserRegist,
      },
      {
        path: "",
        name: "List",
        component: UserList,
      },
      {
        path: ":id",
        name: "Detail",
        component: UserDetail,
      },
    ],
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router
