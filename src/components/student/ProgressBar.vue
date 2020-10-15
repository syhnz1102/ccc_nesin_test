<template>
   <div class="videobarContainer" @click="handleProgressBarBtnClick">
      <div class="menu">
         <div class="info">
            <span>{{ share ? '화면 공유중' : '화상 상담중'}}</span>
            <span>{{ time }}</span>
         </div>
         <div class="button">
            <button @click.stop="handleEndCallBtnClick">close</button>
         </div>
      </div>
   </div>
</template>

<script>
import { eBus } from '../../commons/eventBus';
import store from '../../store';
import {sendMessage} from "../../commons/message";
import WebRTC from "../../commons/webrtc";
import { getIntervalTime } from "../../commons/utils";

export default {
  name: "Button",
  props: { share: Boolean },
  data() {
    return {
      interval: null,
      time: getIntervalTime()
    }
  },
  created() {
    this.interval = setInterval(this.intervalFunc, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    intervalFunc() {
      this.time = getIntervalTime();
    },
    handleProgressBarBtnClick() {
      this.$emit('hideProgressBar', { on: false });
      eBus.$emit('showVideo', { on: true, share: this.share })
    },
    handleEndCallBtnClick() {
      let s = this.$store.state;
      eBus.$emit('showVideo', { on: false });
      eBus.$emit('progressBar', { on: false });

      if (this.share) {
        eBus.$emit('chat', {
          type: 'notice',
          message: '화면 공유가 종료되었습니다.'
        });

        sendMessage('ScreenShareConferenceEnd', { userId: s.userInfo.id, roomId: s.roomInfo.roomId, useMediaSvr: 'N' })
        this.$store.commit('setSharingStatus', false);
      } else {
        eBus.$emit('chat', {
          type: 'notice',
          message: '화상 상담이 종료되었습니다.'
        });
      }

      sendMessage('EndCall', { userId: s.userInfo.id, roomId: s.roomInfo.roomId });
      WebRTC.endCall();
    },
  }
}
</script>
