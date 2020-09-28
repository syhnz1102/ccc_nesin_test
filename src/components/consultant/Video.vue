<template>
  <div class="videoContainer">
    <div class="mainVideo">
      <div class="video" v-bind:class="{ 'camoff': offVideo }">
        <div v-if="offMic" class="micoff"></div>
        <video ref="remoteVideo"></video>
      </div>
      <div class="video local" v-bind:class="{ 'camoff': offVideo }">
        <div v-if="offMic" class="micoff"></div>
        <video ref="localVideo"></video>
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
import WebRTC from "../../commons/webrtc";
import {eBus} from "../../commons/eventBus";

export default {
  name: "Video",
  data() {
    return {
      offVideo: true,
      offMic: true
    }
  },
  async created() {
    let stream = await WebRTC.createVideoStream();
    this.$refs.localVideo.srcObject = stream;
    this.$refs.localVideo.autoplay = true;
    this.$refs.localVideo.muted = true;
    this.$refs.localVideo.playsInline = true;

    // peer 생성
    await WebRTC.createPeer();
    await WebRTC.createOffer('local');

    eBus.$on('video', param => {
      this.$refs.remoteVideo.srcObject = param.stream;
      this.$refs.remoteVideo.autoplay = true;
      this.$refs.remoteVideo.playsInline = true;
    })
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
