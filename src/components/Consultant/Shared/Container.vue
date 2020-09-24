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
            <button>전송</button>
         </div>
      </div>
      <!-- <VideoConsult v-if="isOn == 1"/> -->

      <DeviceStart v-if="firstModal" />
      <VideoConsult v-if="isOn == 1" />
      
   </div>
</template>

<script>

import StatusBar from './StatusBar'
import StudentEntrance from '../Consult/ConsultantConsultStudentEntrance'
import VideoConsult from '../VideoConsult/ConsultantVideoConsult'
import DeviceStart from '../VideoConsult/ConsultantVideoConsultDeviceStart'

import { eBus } from '../../../commons/eventBus.js'

export default {
   components: {
      StatusBar,
      StudentEntrance,
      VideoConsult,
      DeviceStart
   },
   name: 'hello',
   data () {
      return {
         entrance:false,
         videoOn:false,
         isOn: 0,
         firstModal: false
      }
   },
   created () {

      eBus.$on('isOnOne',(one) => {
         this.isOn = one;
         console.log('isOn == '+one);
         this.firstModal= true;
      });

      eBus.$on('isOnZero',(zero) => {
         this.isOn = zero;
         console.log('isOn == '+zero);
      });

      eBus.$on('closeDeviceStart',(close) => {
         console.log('closemodal: '+close);
         this.firstModal = close;
      });

   },
   methods: {
   }
}
</script>

<style>
  @import '../../../assets/consultant/css/consultant.css';
</style>