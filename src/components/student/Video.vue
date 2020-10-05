<template>
  <div class="videoContainer">
    <div class="mainVideo">
      <div class="video" v-bind:class="{ 'camoff': offVideo.remote }">
        <div v-if="offMic.remote" class="micoff"></div>
        <video ref="remoteVideo"></video>
      </div>
      <div class="video local" v-bind:class="{ 'camoff': offVideo.local }">
        <div v-if="offMic.local" class="micoff"></div>
        <video ref="localVideo"></video>
      </div>
    </div>
    <Button />
  </div>
</template>

<script>
import Button from './Button';
import { eBus } from '../../commons/eventBus';
import webRTC from "../../commons/webrtc";

export default {
  components: {
    Button
  },
  data() {
    return {
      offVideo: {
        local: false,
        remote: false
      },
      offMic: {
        local: false,
        remote: false
      }
    }
  },
  async created() {
    let stream = await webRTC.createVideoStream();
    this.$refs.localVideo.srcObject = stream;
    this.$refs.localVideo.autoplay = true;
    this.$refs.localVideo.muted = true;
    this.$refs.localVideo.playsInline = true;

    eBus.$on('video', param => {
      if (param.type === 'set') {
        if (param.hasOwnProperty('video')) {
          this.offVideo[param.id] = param.video;
          this.$refs.remoteVideo.style = this.offVideo[param.id] ? `display: none` : `display: block`;
        }
        if (param.hasOwnProperty('audio')) {
          this.offMic[param.id] = param.audio;
        }
      } else {
        this.$refs.remoteVideo.srcObject = param.stream;
        this.$refs.remoteVideo.autoplay = true;
        this.$refs.remoteVideo.playsInline = true;
      }
    })
  },
}
</script>
