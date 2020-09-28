<template>
  <div class="videoContainer">
    <div class="mainVideo">
      <div class="video" v-bind:class="{ 'camoff': offVideo }">
        <div v-if="offMic" class="micoff"></div>
        <video></video>
      </div>
      <div class="video local" v-bind:class="{ 'camoff': offVideo }">
        <div v-if="offMic" class="micoff"></div>
        <video></video>
      </div>
    </div>
    <div class="videobarContainer">
      <div class="menu">
        <div class="info">
          <span>홍길동</span>
          <span>00:00</span>
        </div>
        <div class="button">
          <button @click="handleVideoOffBtnClick" class="cam" v-bind:class="{ 'off': offVideo }"></button>
          <button @click="handleMicOffBtnClick" class="mic" v-bind:class="{ 'off': offMic }"></button>
          <button class="endcall"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Video",
  data() {
    return {
      offVideo: true,
      offMic: true
    }
  },
  created() {
    // eBus.$on('closeDeviceStart', ( bool ) => {
    //   this.offVideo = bool,
    //     this.offMic = bool
    // });
  },
  methods: {
    handleVideoOffBtnClick() {
      this.offVideo = !this.offVideo;
    },
    handleMicOffBtnClick() {
      this.offMic = !this.offMic;
    },
  }
}
</script>
