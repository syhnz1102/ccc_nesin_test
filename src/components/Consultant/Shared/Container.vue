<template>
   <div class="container">
      <div class="chatContainer">
         <StatusBar/>
         <div class="chatContent">
            <p>상담이 개설되었습니다.</p>
         </div>
         <div class="chatInput">
            <input tyle="text" placeholder="메시지를 입력하세요.">
            <button>전송</button>
         </div>
      </div>
   </div>
</template>

<script>

import StatusBar from './StatusBar'

export default {
   components: {
      StatusBar
   },
   name: 'hello',
   data () {
      return {
      }
   }
}
</script>

<style>
  @import '../../../assets/consultant/css/consultant.css';
</style>