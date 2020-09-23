<template>
    <div class="wrapper"> 
      <Toast v-if="toast"/>
      <Header/>
      <div class="containerView" v-if="containerView == 0">
        <NavBar/>
        <Container/>
      </div>
      <div class="containerView" v-if="containerView == 1">
        <Entrance/>
      </div>
      <div class="containerView" v-if="containerView == 2">
        <NavBar/>
        <Container/>
      </div>
      <div class="containerView" v-if="containerView == 3">
        <NavBar/>
        <Container/>
      </div>

    </div>
</template>


<script>

import Header from '@/components/consultant/shared/Header'
import NavBar from '@/components/consultant/shared/NavBar'

import Container from '@/components/consultant/shared/Container'
import Entrance from '@/components/consultant/Consult/ConsultantConsultStudentEntrance'

import Toast from '@/components/consultant/Consult/ConsultantConsultToast'

export default {
  components: {
    NavBar,
    Header,
    Container,
    Toast,
    Entrance
  },
  name: 'hello',
  data () {
    return {
      toast: false,
      containerView: 0, //0: 상담전 1:학생입장 2:화상상담 3:화면공유
    }
  }
}
</script>

<style>
  @import '../../assets/consultant/css/consultant.css';
</style>