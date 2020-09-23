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