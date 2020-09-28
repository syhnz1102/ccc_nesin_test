<template>
  <div class="videoContainer">
    <div class="mainVideo">
<!--      <div class="video" v-bind:class="{ 'camoff': offVideo }">-->
      <div class="video">
        <div class="micoff"></div>
        <video ref="remoteVideo"></video>
      </div>
<!--      <div class="video local" v-bind:class="{ 'camoff': offVideo }">-->
      <div class="video local">
        <div class="micoff"></div>
        <video ref="localVideo"></video>
      </div>
    </div>
<!--    <VideoConsultBtn-->
<!--      v-if="!hideBtn"-->
<!--      @Btn="btnBinder"-->
<!--    />-->
  </div>
</template>

<script>
import { eBus } from '../../commons/eventBus';
import webRTC from "../../commons/webrtc";

export default {
  async created() {
    let stream = await webRTC.createVideoStream();
    this.$refs.localVideo.srcObject = stream;
    this.$refs.localVideo.autoplay = true;
    this.$refs.localVideo.muted = true;
    this.$refs.localVideo.playsInline = true;

    eBus.$on('video', param => {
      this.$refs.remoteVideo.srcObject = param.stream;
      this.$refs.remoteVideo.autoplay = true;
      this.$refs.remoteVideo.playsInline = true;
    })
  },
}
</script>
