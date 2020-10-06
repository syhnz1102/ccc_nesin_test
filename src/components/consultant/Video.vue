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
    <div class="videobarContainer">
      <div class="menu">
        <div class="info">
          <span>{{ name }}</span>
          <span>{{ time }}</span>
        </div>
        <div class="button">
          <button @click="handleVideoOffBtnClick" class="cam" v-bind:class="{ 'off': offVideo.local }"></button>
          <button @click="handleMicOffBtnClick" class="mic" v-bind:class="{ 'off': offMic.local }"></button>
          <button class="endcall"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebRTC from "../../commons/webrtc";
import { eBus } from "../../commons/eventBus";
import { sendMessage } from "../../commons/message";
import { runningTime } from "../../commons/utils";
import store from '../../store';

export default {
  name: "Video",
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
      name: '',
      time: '00:00',
      counter: 0,
      interval: null,
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

    eBus.$on('consultInfo', param => {
      this.name = param.name;
      this.interval = setInterval(this.intervalFunc, 1000);
    })
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    intervalFunc() {
      store.commit('setRunningTimeInfo', runningTime(this.counter++));
      this.time = this.$store.state.runningTime;
    },
    handleVideoOffBtnClick() {
      this.offVideo.local = !this.offVideo.local;
      this.$refs.localVideo.style = this.offVideo.local ? `display: none` : `display: block`;

      let s = this.$store.state;
      sendMessage('SetVideo', { userId: s.userInfo.id, roomId: s.roomInfo.roomId, status: this.offVideo.local }, 'signalOp');

      if (s.streamInfo.local) {
        const tracks = s.streamInfo.local.getTracks();
        tracks.forEach(curr => {
          if (curr.kind === 'video') {
            curr.enabled = !this.offVideo.local;
          }
        });
      }
    },
    handleMicOffBtnClick() {
      this.offMic.local = !this.offMic.local;

      let s = this.$store.state;
      sendMessage('SetAudio', { userId: s.userInfo.id, roomId: s.roomInfo.roomId, status: this.offMic.local }, 'signalOp');

      if (s.streamInfo.local) {
        const tracks = s.streamInfo.local.getTracks();
        tracks.forEach(curr => {
          if (curr.kind === 'audio') {
            curr.enabled = !this.offMic.local;
          }
        });
      }
    },
  }
}
</script>
