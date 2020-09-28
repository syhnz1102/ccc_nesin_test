<template>
   <div class="buttonContainer">
      <div class="topButton">
         <div class="button">
            <button class="hide" @click="handleHideBtnClick"></button>
         </div>
      </div>
      <div class="bottomButton">
         <div class="button">
            <button class="cam" @click="handleCamBtnClick"></button>
            <button class="mic" @click="handleMicBtnClick"></button>
            <button class="endCall" @click="handleEndCallBtnClick"></button>
         </div>
      </div>
   </div>
</template>

<script>
import { eBus } from '../../../commons/eventBus';

export default {
   data() {
      return {
         popUp: {
            on: true,
            contents: '화상 상담을 종료하시겠습니까?'
         },
         video: {
            videoOn: false,
            shareOn: false,
            videoHideOn: true,
            shareHideOn: false,
         },
         Btn: {
            offVideo: false,
            offMic: false,
         }
      }
   },
   methods: {
      handleHideBtnClick() {
         eBus.$emit('video', this.video);
      },
      handleCamBtnClick() {
         this.Btn = {
            offVideo: !this.Btn.offVideo,
            offMic: this.Btn.offMic
         }
         this.$emit('Btn', this.Btn);
      },
      handleMicBtnClick() {
         this.Btn = {
            offVideo: this.Btn.offVideo,
            offMic: !this.Btn.offMic,
         }
         this.$emit('Btn', this.Btn);
      },
      handleEndCallBtnClick() {
         eBus.$emit('popUp', this.popUp);
      }
   }
}
</script>