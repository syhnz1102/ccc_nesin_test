<template>
   <div class="header">
      <div class="logo">
         <strong>{{ userName }} 상담 방</strong>
      </div>
      <div class="button">
         <button @click="handleExitBtn">상담종료</button>
      </div>
   </div>
</template>

<script>
import router from "../../router";
import { sendMessage } from '../../commons/message';
import { eBus } from "../../commons/eventBus";
import store from "../../store";
import webRTC from "../../commons/webrtc";

export default {
  data() {
    return {
      userName: ''
    }
  },
  created() {
    this.userName = this.$store.state.studentName;
  },
  methods: {
    handleExitBtn() {
      eBus.$emit('popup', {
        on: true,
        type: 'Confirm',
        title: '',
        contents: `상담을 종료 하시겠습니까?`,
        ok: () => {
          if (this.$store.state.socket) {
            sendMessage('ExitRoom', { roomId: window.location.href.split('/room/')[1] });
            this.$store.state.socket.close();

            webRTC.clear();
          }

          this.$store.commit('setCallingStatus', false);
          this.$store.commit('setJoinedStatus', false);
          this.$store.commit('setSharingStatus', false);
          window.resizeTo( 514, 606 );
          // router.push({ path: `/main` });
          // router.push({ path: `/main?userName=` + this.$store.state.studentName });
          window.close();
          console.log('store : ', store.state)
        }
      })
    }
  }
}
</script>
