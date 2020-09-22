import Vue from 'vue'
import Router from 'vue-router'

//상담사
import ConsultantMain from '@/pages/ConsultantMain'
import ConsultantCall from '@/pages/ConsultantCall'

import ConsultantConsult from '@/components/consultant/Consult/ConsultantConsult'
import ConsultantConsultDevice from '@/components/consultant/Consult/ConsultantConsultDevice'
import ConsultantConsultStudentEntrance from '@/components/consultant/Consult/ConsultantConsultStudentEntrance'
import ConsultantConsultToast from '@/components/consultant/Consult/ConsultantConsultToast'
import ConsultantConsultType3 from '@/components/consultant/Consult/ConsultantConsultType3'

import ConsultantVideoConsult from '@/components/consultant/VideoConsult/ConsultantVideoConsult'
import ConsultantVideoConsultDeviceStart from '@/components/consultant/VideoConsult/ConsultantVideoConsultDeviceStart'
import ConsultantVideoConsultDeviceOnPlay from '@/components/consultant/VideoConsult/ConsultantVideoConsultDeviceOnPlay'
import ConsultantVideoConsultDeviceOff from '@/components/consultant/VideoConsult/ConsultantVideoConsultDeviceOff'

import ConsultantDisplayShare from '@/components/consultant/DisplayShare/ConsultantDisplayShare'

import ConsultantPopUp from '@/components/consultant/PopUp/ConsultantPopUp'

//학생
import StudentMain from '@/components/Student/Main/StudentMain'

import StudentConsult from '@/components/Student/Consult/StudentConsult'

import StudentVideoConsult from '@/components/Student/VideoConsult/StudentVideoConsult'
import StudentVideoConsultBtn from '@/components/Student/VideoConsult/StudentVideoConsultBtn'
import StudentVideoConsultDeviceOff from '@/components/Student/VideoConsult/StudentVideoConsultDeviceOff'
import StudentVideoConsultDeviceOffBtn from '@/components/Student/VideoConsult/StudentVideoConsultDeviceOffBtn'
import StudentVideoConsultDeviceHide from '@/components/Student/VideoConsult/StudentVideoConsultDeviceHide'

import StudentDisplayShare from '@/components/Student/DisplayShare/StudentDisplayShare'
import StudentDisplayShareBtn from '@/components/Student/DisplayShare/StudentDisplayShareBtn'
import StudentDisplayShareHide from '@/components/Student/DisplayShare/StudentDisplayShareHide'

import StudentPopUp from '@/components/Student/PopUp/StudentPopUp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    //상담사==================================================================
    //메인
    {
      path: '/',
      name: 'ConsultantMain',
      component: ConsultantMain
    },
    //콜
    {
      path: '/ConsultantCall',
      name: 'ConsultantCall',
      component: ConsultantCall
    },
    //상담
    {
      path: '/ConsultantConsult',
      name: 'ConsultantConsult',
      component: ConsultantConsult
    },

    {
      path: '/ConsultantConsultDevice',
      name: 'ConsultantConsultDevice',
      component: ConsultantConsultDevice
    },

    {
      path: '/ConsultantConsultStudentEntrance',
      name: 'ConsultantConsultStudentEntrance',
      component: ConsultantConsultStudentEntrance
    },

    {
      path: '/ConsultantConsultToast',
      name: 'ConsultantConsultToast',
      component: ConsultantConsultToast
    },

    {
      path: '/ConsultantConsultType3',
      name: 'ConsultantConsultType3',
      component: ConsultantConsultType3
    },

    //화상상담
    {
      path: '/ConsultantVideoConsult',
      name: 'ConsultantVideoConsult',
      component: ConsultantVideoConsult
    },

    {
      path: '/ConsultantVideoConsultDeviceStart',
      name: 'ConsultantVideoConsultDeviceStart',
      component: ConsultantVideoConsultDeviceStart
    },

    {
      path: '/ConsultantVideoConsultDeviceOnPlay',
      name: 'ConsultantVideoConsultDeviceOnPlay',
      component: ConsultantVideoConsultDeviceOnPlay
    },

    {
      path: '/ConsultantVideoConsultDeviceOff',
      name: 'ConsultantVideoConsultDeviceOff',
      component: ConsultantVideoConsultDeviceOff
    },
    //화면공유
    {
      path: '/ConsultantDisplayShare',
      name: 'ConsultantDisplayShare',
      component: ConsultantDisplayShare
    },
    //팝업
    {
      path: '/ConsultantPopUp',
      name: 'ConsultantPopUp',
      component: ConsultantPopUp
    },

    //학생==================================================================
    //메인
    {
      path: '/StudentMain',
      name: 'StudentMain',
      component: StudentMain
    },
    //상담
    {
      path: '/StudentConsult',
      name: 'StudentConsult',
      component: StudentConsult
    },
    //화상상담
    {
      path: '/StudentVideoConsult',
      name: 'StudentVideoConsult',
      component: StudentVideoConsult
    },

    {
      path: '/StudentVideoConsultBtn',
      name: 'StudentVideoConsultBtn',
      component: StudentVideoConsultBtn
    },

    {
      path: '/StudentVideoConsultDeviceOff',
      name: 'StudentVideoConsultDeviceOff',
      component: StudentVideoConsultDeviceOff
    },
    
    {
      path: '/StudentVideoConsultDeviceOffBtn',
      name: 'StudentVideoConsultDeviceOffBtn',
      component: StudentVideoConsultDeviceOffBtn
    },
    
    {
      path: '/StudentVideoConsultDeviceHide',
      name: 'StudentVideoConsultDeviceHide',
      component: StudentVideoConsultDeviceHide
    },
    //화면공유
    {
      path: '/StudentDisplayShare',
      name: 'StudentDisplayShare',
      component: StudentDisplayShare
    },
    {
      path: '/StudentDisplayShareBtn',
      name: 'StudentDisplayShareBtn',
      component: StudentDisplayShareBtn
    },
    {
      path: '/StudentDisplayShareHide',
      name: 'StudentDisplayShareHide',
      component: StudentDisplayShareHide
    },

    //팝업
    {
      path: '/StudentPopUp',
      name: 'StudentPopUp',
      component: StudentPopUp
    },
  ]
})
