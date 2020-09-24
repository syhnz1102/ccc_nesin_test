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

      <DeviceStandard v-if="standardSetting" />
      <DeviceStart v-if="firstSetting" />
      <DeviceOnplay v-if="onPlaysetting" />
      <VideoConsult v-if="videoOn == 1" />
      
   </div>
</template>

<script>

import StatusBar from './StatusBar'
import StudentEntrance from '../Consult/ConsultantConsultStudentEntrance'
import VideoConsult from '../VideoConsult/ConsultantVideoConsult'
import DeviceStandard from '../Consult/ConsultantConsultDevice'
import DeviceStart from '../VideoConsult/ConsultantVideoConsultDeviceStart'
import DeviceOnplay from '../VideoConsult/ConsultantVideoConsultDeviceOnplay'

import { eBus } from '../../../commons/eventBus.js'

export default {
   components: {
      StatusBar,
      StudentEntrance,
      VideoConsult,
      DeviceStandard,
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
         onPlaysetting: false,
         standardSetting: false
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

      eBus.$on('closeDeviceStart',(bool) => {
         this.firstSetting = bool;
      });

      eBus.$on('deviceOnPlay',(bool) => {
         this.onPlaysetting = bool;
         this.isOn = 3;
      }),

      eBus.$on('closeDeviceOnPlay',(bool) => {
         this.onPlaysetting = bool;
         this.isOn = 0;
      }),
      //디바이스 열기, 닫기 따로한이유
      //1.열때와 닫을때 버튼의 컴포넌트가 다름
      //2.나중에 버튼을 눌렀을때 어차피 device세팅을 세팅창 열기+적용/확인 으로 나눠줘야하기 때문에 굳이 하나로 하지않음
      eBus.$on('deviceStandard',(bool) => {
         this.standardSetting = bool;
      }),

      eBus.$on('closeDeviceStandard',(bool) => {
         this.standardSetting = bool;
      })
   },
   methods: {
   }
}
</script>

<style>
  @import '../../../assets/consultant/css/consultant.css';
</style>