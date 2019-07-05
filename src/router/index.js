import Vue from 'vue'
import Router from 'vue-router'
import Top from '../layout/top.vue'
import Sidebar from '../layout/sidebar.vue'
import Home from '../views/Home.vue'
import Article from '../views/articleManager/index.vue'
import Soul from '../views/soulManager/index.vue'
import Question from '../views/questionManager/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        top: Top,
        sidebar: Sidebar,
        content: Home
      },
      children: [
        {
          path: '/',
          component: Article
        },
        {
          path: '/soul',
          component: Soul
        },
        {
          path: '/question',
          component: Question
        }
      ]
    }
  ]
})
