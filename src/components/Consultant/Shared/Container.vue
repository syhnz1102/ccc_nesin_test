<template>
   <div class="container">
      <div class="chatContainer">
         <StatusBar/>
         <div v-if="!entrance" class="chatContent">
            <p>상담이 개설되었습니다.</p>
         </div>

         <StudentEntrance v-if="entrance" />

         <div class="chatInput">
            <input tyle="text" placeholder="메시지를 입력하세요.">
            <button @click="check01">전송</button>
         </div>
      </div>
      <!-- <VideoConsult v-if="isOn == 1"/> -->

      <VideoConsult v-if="isOn == 1" />
      
   </div>
</template>

<script>

import StatusBar from './StatusBar'
import StudentEntrance from '../Consult/ConsultantConsultStudentEntrance'
import VideoConsult from '../VideoConsult/ConsultantVideoConsult'

import { eBus } from '../../../commons/eventBus.js'

export default {
   components: {
      StatusBar,
      StudentEntrance,
      VideoConsult
   },
   name: 'hello',
   data () {
      return {
         entrance:false,
         videoOn:false,
         isOn: 0,
      }
   },
   created () {
      eBus.$on('isOnOne',(data) => {
         this.isOn = data;
      });
   },
   methods: {
      check01(){
         console.log(this.isOn)
      }
   }
}
</script>

<style>
  @import '../../../assets/consultant/css/consultant.css';
</style>