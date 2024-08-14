import { createRouter, createWebHistory } from 'vue-router'
import TaskOneView from '../views/TaskOneView.vue'
import TaskTwoView from '../views/TaskTwoView.vue'
import TaskThreeView from '../views/TaskThreeView.vue'
import TaskFourView from '../views/TaskFourView.vue'
import TaskFiveView from '../views/TaskFiveView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'task1',
      component: TaskOneView
    },
    {
      path: '/task2',
      name: 'task2',
      component: TaskTwoView
    },
    {
      path: '/task3',
      name: 'task3',
      component: TaskThreeView
    },
    {
      path: '/task4',
      name: 'task4',
      component: TaskFourView
    },
    {
      path: '/task5',
      name: 'task5',
      component: TaskFiveView
    }
  ]
})

export default router
