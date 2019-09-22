import Vue from 'vue'
import Router from 'vue-router'
import Top from '../layout/top.vue'
import Sidebar from '../layout/sidebar.vue'
import Home from '../views/Home.vue'
import Article from '../views/articleManager/index.vue'
import Soul from '../views/soulManager/index.vue'
import Question from '../views/questionManager/index.vue'
import Tag from '../views/tagManager/index.vue'
import Type from '../views/typeManager/index.vue'
import Login from '../views/login/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: "Login",
      components : {
        content: Login
      }
    },
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
        },
        {
          path: '/tag',
          component: Tag
        },
        {
          path: '/type',
          component: Type
        }
      ]
    }
  ]
})
