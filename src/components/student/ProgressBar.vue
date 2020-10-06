<template>
   <div class="videobarContainer" @click="handleProgressBarBtnClick">
      <div class="menu">
         <div class="info">
            <span>{{ screenShare ? '화면 공유중' : '화상 상담중'}}</span>
            <span>{{ runningTime }}</span>
         </div>
         <div class="button">
            <button @click="handleVideoExitBtnClick">close</button>
         </div>
      </div>
   </div>
</template>

<script>
// import { eBus } from '../../commons/eventBus'
import store from '../../store';

export default {
  name: "Button",
  data() {
    return {
      runningTime: '',
      interval: this.$store.state.runningTime,
      screenShare: false,
    }
  },
  created() {
    console.log('progress bar');
    this.interval = setInterval(this.intervalFunc, 1000);
    this.screenShare = this.$store.state.screenShare; //bool
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    intervalFunc() {
      this.runningTime = this.$store.state.runningTime;
    },
    handleVideoExitBtnClick() {

    },
    handleProgressBarBtnClick() {
      this.$emit('hideProgressBar', { on: false });
    }
  }
}
</script>
