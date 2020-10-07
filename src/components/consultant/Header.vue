<template>
   <div class="header">
      <div class="logo">
         <span class="img">
            <img v-bind:src="logoURL" />
         </span>
         <strong>화상 상담</strong>
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

export default {
  data() {
    return {
      logoURL: 'logo here'
    }
  },
  created() {
    this.logoURL = this.$store.state.logoURL;
    console.log(this.logoURL);
  },
  methods: {
    handleExitBtn() {
      eBus.$emit('popup', {
        on: true,
        type: 'Confirm',
        title: '통화 종료',
        contents: `통화를 종료 하시겠습니까?`,
        ok: () => {
          if (this.$store.state.socket) {
            // webRTC.clear();

            this.$store.state.socket.close();
            sendMessage('ExitRoom', { roomId: window.location.href.split('/room/')[1] });
          }

          this.$store.commit('setCallingStatus', false);
          this.$store.commit('setJoinedStatus', false);
          window.resizeTo( 514, 606 );
          // router.push({ path: `/main` });
          router.push({ path: `/main?logoURL=` + this.logoURL });
          console.log('store : ', store.state)
        }
      })
    }
  }
}
</script>
