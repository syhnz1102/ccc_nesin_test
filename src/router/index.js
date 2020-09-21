import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Type01 from '@/components/Type01'
import Type02 from '@/components/Type02'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },

    {
      path: '/Type01',
      name: 'Type01',
      component: Type01
    },

    {
      path: '/Type02',
      name: 'Type02',
      component: Type02
    }
  ]
})
