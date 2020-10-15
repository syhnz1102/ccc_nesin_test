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
import store from '../../store';
import {sendMessage} from "../../commons/message";
import WebRTC from "../../commons/webrtc";

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
      // this.$store.commit('setCallStatus', { video: this.offVideo.local })
      this.$emit("localVideo", this.offVideo);
    },
    handleMicOffBtnClick() {
      this.offMic.local = !this.offMic.local;
      // this.$store.commit('setCallStatus', { audio: this.offMic.local })
      this.$emit("localMic", this.offMic);
    },
    handleProgressBarBtnClick() {
      eBus.$emit('progressBar', { on: true })
    },
    handleEndCallBtnClick() {
      let s = this.$store.state;
      eBus.$emit('showVideo', { on: false });

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
    }
  }
}
</script>
