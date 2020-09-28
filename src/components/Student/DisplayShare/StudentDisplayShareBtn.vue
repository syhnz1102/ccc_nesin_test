<template>
   <div class="buttonContainer">
      <div class="topButton">
         <div class="button">
            <button class="hide" @click="handleHideBtnClick"></button>
         </div>
      </div>
      <div class="bottomButton">
         <div class="button">
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
            contents: '화면 공유를 종료하시겠습니까?'//endcall msg
         },
         video: {
            videoOn: false,
            shareOn: false,
            videoHideOn: false,
            shareHideOn: true,
         },
         offMic: false,
      }
   },
   methods: {
      handleHideBtnClick() {
         eBus.$emit('video', this.video);
      },
      handleMicBtnClick() {
         this.offMic = !this.offMic
         console.log(this.offMic)
         this.$emit('Btn', this.offMic);
      },
      handleEndCallBtnClick() {//call.vue로
         eBus.$emit('popUp', this.popUp);
      }
   }
}
</script>