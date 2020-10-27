<template>
  <div class="header">
    <div class="logo">
      <strong>입시 화상 상담</strong>
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
import webRTC from '../../commons/webrtc'

export default {
  data() {
    return {
    }
  },
  methods: {
    handleConsultExitBtnClick() {
      if (this.$store.state.socket) {
        sendMessage('ExitRoom', { roomId: window.location.href.split('/room/')[1] });
        this.$store.state.socket.close();
        webRTC.clear();
      }

      router.push({ path: `/student` });
       // console.log('store : ', store.state)
    }
  }
}
</script>
