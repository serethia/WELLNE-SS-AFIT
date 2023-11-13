import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ExerciseView from '@/views/ExerciseView.vue'
import DietView from '@/views/DietView.vue'
import AdviceView from '@/views/AdviceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    }
    
  ]
})

export default router
