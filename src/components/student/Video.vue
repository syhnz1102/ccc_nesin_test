<template>
  <div class="videoContainer" @click="handleVideoContainerBtnClick">
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
    <Button
      v-if="showButton"
      v-bind:offVideo="offVideo"
      v-bind:offMic="offMic"
      @localVideo="localVideo"
      @localMic="localMic"
    />
  </div>
</template>

<script>
import Button from './Button';
import { eBus } from '../../commons/eventBus';
import { sendMessage } from "../../commons/message";
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
      },
      showButton: false
    }
  },
  async created() {
    let stream = await webRTC.createVideoStream();
    this.$refs.localVideo.srcObject = stream;
    this.$refs.localVideo.autoplay = true;
    this.$refs.localVideo.muted = true;
    this.$refs.localVideo.playsInline = true;

    if (this.$store.state.streamInfo.remote) {
      this.$refs.remoteVideo.srcObject = this.$store.state.streamInfo.remote;
      this.$refs.remoteVideo.autoplay = true;
      this.$refs.remoteVideo.playsInline = true;
    }

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
  methods: {
    localVideo(param) {
      this.offVideo.local = param.local
      this.$refs.localVideo.style = this.offVideo.local ? `display: none` : `display: block`;

      let s = this.$store.state;
      sendMessage('SetVideo', { userId: s.userInfo.id, roomId: s.roomInfo.roomId, status: this.offVideo.local }, 'signalOp');
    },
    localMic(param) {
      this.offMic.local = param.local

      let s = this.$store.state;
      sendMessage('SetAudio', { userId: s.userInfo.id, roomId: s.roomInfo.roomId, status: this.offMic.local }, 'signalOp');
    },
    handleVideoContainerBtnClick() {
      this.showButton = !this.showButton
    }
  }
}
</script>
