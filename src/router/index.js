import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/pages/consultant/Main'
import Call from '@/pages/consultant/Call'
import StudentMain from '@/pages/student/Main'
import StudentCall from '@/pages/student/Call'

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
      path: '/room',
      name: 'Call',
      component: Call
    },
    {
      path: '/student',
      name: 'StudentMain',
      component: StudentMain
    },
    {
      path: '/student/room/',
      name: 'StudentCall',
      component: StudentCall
    },
  ]
})
