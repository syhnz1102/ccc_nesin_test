<template>
  <div class="buttonContainer">
    <div class="topButton">
      <div class="button">
        <button @click="handleProgressBarBtnClick" class="hide"></button>
      </div>
    </div>
    <div class="bottomButton">
      <div class="button">
        <button @click.stop="handleVideoOffBtnClick" class="cam" v-bind:class="{ 'off' : offVideo.local }"></button>
        <button @click.stop="handleMicOffBtnClick" class="mic" v-bind:class="{ 'off' : offMic.local }"></button>
        <button @click="handleEndCallBtnClick" class="endCall"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { eBus } from '../../commons/eventBus';
import store from '../../store';

export default {
  name: "Button",
  props: { offVideo: Object, offMic: Object },
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
    handleEndCallBtnClick() {//is calling false하기
      eBus.$emit('showVideo', { on: false })

      eBus.$emit('chat', {
        type: 'notice',
        message: '화상 상담이 종료되었습니다.'
      });
    }
  }
}
</script>
