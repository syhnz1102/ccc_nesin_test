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

      <DeviceStart v-if="firstSetting" />
      <DeviceOnplay v-if="setting" />
      <VideoConsult v-if="videoOn == 1" />
      <!-- <VideoConsult v-if="isOn == 1" /> -->
      
   </div>
</template>

<script>

import StatusBar from './StatusBar'
import StudentEntrance from '../Consult/ConsultantConsultStudentEntrance'
import VideoConsult from '../VideoConsult/ConsultantVideoConsult'
import DeviceStart from '../VideoConsult/ConsultantVideoConsultDeviceStart'
import DeviceOnplay from '../VideoConsult/ConsultantVideoConsultDeviceOnplay'

import { eBus } from '../../../commons/eventBus.js'

export default {
   components: {
      StatusBar,
      StudentEntrance,
      VideoConsult,
      DeviceStart,
      DeviceOnplay
   },
   name: 'hello',
   data () {
      return {
         entrance:false,
         videoOn: 0,
         isOn: 0,
         firstSetting: false,
         setting: false,
      }
   },
   created () {

      eBus.$on('isOnOne',(one) => {
         this.isOn = one;
         this.videoOn = one;
         this.firstSetting= true;
      });

      eBus.$on('isOnZero',(zero) => {
         this.isOn = zero;
         this.videoOn = zero;
      });

      eBus.$on('closeDeviceStart',(close) => {
         this.firstSetting = close;
      });

      eBus.$on('deviceOnPlay',(open) => {
         this.setting = open;
         this.isOn = 3;
      }),

      eBus.$on('closeDeviceOnPlay',(close) => {
         this.setting = close;
         this.isOn = 0;
      })
   },
   methods: {
   }
}
</script>

<style>
  @import '../../../assets/consultant/css/consultant.css';
</style>