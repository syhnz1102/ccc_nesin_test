<template>
   <div class="header">
      <div class="logo">
         <span class="img">
            <img src="@/assets/student/images/img_logo_sample.png" />
         </span>
         <strong>화상 상담</strong>
      </div>
      <div class="button">
         <button @click="handleConsultExitBtnClick">상담종료</button>
      </div>
   </div>
</template>

<script>

import { sendMessage } from "../../commons/message";
import router from "../../router";
import store from "../../store";

export default {
  data() {
    return {
    }
  },
  methods: {
     handleConsultExitBtnClick() {
       if (this.$store.state.socket) {
         // webRTC.clear();

         this.$store.state.socket.close();
         sendMessage('ExitRoom', { roomId: window.location.href.split('/room/')[1] });
       }

       router.push({ path: `/student` });
       console.log('store : ', store.state)
       // window.open("about:blank","_self").close();
     }
  }
}
</script>
