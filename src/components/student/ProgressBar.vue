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
      if (this.time === '00:00') {
        eBus.$emit('popup', {
          on: true,
            type: 'Alert',
            title: '화면 공유',
            contents: '연결이 된 후 종료가 가능합니다.'
        })
        return false;
      }
      WebRTC.endCall();
    },
  }
}
</script>
