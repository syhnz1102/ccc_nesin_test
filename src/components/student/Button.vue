<template>
  <div class="buttonContainer">
    <div class="topButton">
      <div class="button">
        <button @click="handleProgressBarBtnClick" class="hide"></button>
      </div>
    </div>
    <div class="bottomButton">
      <div class="button">
        <button v-if="!share" @click.stop="handleVideoOffBtnClick" class="cam" v-bind:class="{ 'off' : offVideo.local }"></button>
        <button @click.stop="handleMicOffBtnClick" class="mic" v-bind:class="{ 'off' : offMic.local }"></button>
        <button @click="handleEndCallBtnClick" class="endCall"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { eBus } from '../../commons/eventBus';
import { sendMessage } from "../../commons/message";
import WebRTC from "../../commons/webrtc";
import { getIntervalTime } from '../../commons/utils';
import store from '../../store';

export default {
  name: "Button",
  props: { offVideo: Object, offMic: Object, share: Boolean },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
    handleVideoOffBtnClick() {
      this.offVideo.local = !this.offVideo.local;
      this.$emit("localVideo", this.offVideo);
    },
    handleMicOffBtnClick() {
      this.offMic.local = !this.offMic.local;
      this.$emit("localMic", this.offMic);
    },
    handleProgressBarBtnClick() {
      eBus.$emit('progressBar', { on: true })
    },
    handleEndCallBtnClick() {
      if (getIntervalTime() === '00:00') {
        eBus.$emit('popup', {
          on: true,
          type: 'Alert',
          title: '화면 공유',
          contents: '통화 연결이 된 후 종료가 가능합니다.'
        })
        return false;
      }
      let s = this.$store.state;
      WebRTC.endCall();
    }
  }
}
</script>
