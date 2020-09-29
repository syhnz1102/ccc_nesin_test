import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/consultant/Main'
import Call from '@/pages/consultant/Call'
import StudentMain from '@/pages/student/Main'
import StudentCall from '@/pages/student/Call'

import Intro from '@/pages/Intro'; // TO DO DELETE
 
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/main', // TO DO modify 'root'
      name: 'Main',
      component: Main
    },
    {
      path: '/room/:id',
      name: 'Call',
      component: Call
    },
    {
      path: '/student',
      name: 'StudentMain',
      component: StudentMain
    },
    {
      path: '/student/room/:id',
      name: 'StudentCall',
      component: StudentCall
    },
  ]
})
