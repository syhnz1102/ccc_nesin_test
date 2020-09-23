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
      <div class="videoContainer">
            <div class="mainVideo">
               <div class="video camoff">
                  <div class="micoff"></div>
                  <!-- <video style="background:url('@/assets/consultant/images/img_video_sample2.jpg') no-repeat center 0;background-size:cover"></video> -->
               </div>
               <div class="video local camoff">
                  <div class="micoff"></div>
                  <!-- <video style="background:url('@/assets/consultant/images/img_video_sample1.jpg') no-repeat center 0;background-size:cover"></video> -->
               </div>
            </div>
            <div class="videobarContainer">
               <div class="menu">
                  <div class="info">
                     <span>홍길동</span>
                     <span>00:00</span>
                  </div>
                  <div class="button">
                     <button class="cam off"></button>
                     <button class="mic off"></button>
                     <button class="endcall"></button>
                  </div>
               </div>
            </div>
         </div>
   </div>
</template>

<script>

import StatusBar from './StatusBar'
import StudentEntrance from '../Consult/ConsultantConsultStudentEntrance'

export default {
   components: {
      StatusBar,
      StudentEntrance
   },
   name: 'hello',
   data () {
      return {
         entrance:false
      }
   }
}
</script>

<style>
  @import '../../../assets/consultant/css/consultant.css';
</style>