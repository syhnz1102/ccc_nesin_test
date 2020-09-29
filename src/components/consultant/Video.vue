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
          <span>{{ name }}</span>
          <span>{{ time }}</span>
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
import { runningTime } from "../../commons/utils";
import { eBus } from "../../commons/eventBus";

export default {
  name: "Video",
  data() {
    return {
      offVideo: true,
      offMic: true,
      name: '',
      time: '00:00',
      counter: 0
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
    eBus.$on('consultInfo', param => {
      // this.consultInfo.name = param.name;
      // this.consultInfo.time = param.time;

      this.name = param.name;
      setInterval(this.intervalFunc, 1000);
    })
  },
  methods: {
    intervalFunc() {
      this.time = runningTime(this.counter++);
    },
    handleVideoOffBtnClick() {
      this.offVideo = !this.offVideo;
    },
    handleMicOffBtnClick() {
      this.offMic = !this.offMic;
    }
  }
}
</script>
