<template>
  <div class="videoContainer">
    <div class="shareVideo" v-if="share">
      <div class="share">
        <img src="../../assets/consultant/images/img_screen_share_sharing.gif" alt="화면 공유중">
        <p>{{ shareMessage }}</p>
      </div>
    </div>
    <div class="mainVideo" v-bind:style="{display: (share ? 'none' : 'block')}">
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
          <button v-if="!isSharing" @click="handleVideoOffBtnClick" class="cam" v-bind:class="{ 'off': offVideo.local }"></button>
          <button @click="handleMicOffBtnClick" class="mic" v-bind:class="{ 'off': offMic.local }"></button>
          <button @click="handleEndcallBtnClick" class="endcall"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebRTC from "../../commons/webrtc";
import { eBus } from "../../commons/eventBus";
import { sendMessage } from "../../commons/message";
import { getIntervalTime, stopInterval } from "../../commons/utils";
import store from '../../store';

export default {
  props: { isSharing: Boolean },
  name: "Video",
  data() {
    return {
      share: this.isSharing,
      shareMessage: '로딩 중입니다.',
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
      interval: null,
    }
  },
  async created() {
    if (this.share) {
      eBus.$emit('startShare', {})
      this.shareMessage = '화면 공유 중입니다.';
      this.$store.commit('setSharingStatus', true);
    } else {
      let stream = await WebRTC.createVideoStream();
      if (!this.$refs.localVideo) return;
      this.$refs.localVideo.srcObject = stream;
      this.$refs.localVideo.autoplay = true;
      this.$refs.localVideo.muted = true;
      this.$refs.localVideo.playsInline = true;

      // peer 생성
      await WebRTC.createPeer();
      await WebRTC.createOffer('local');
    }

    if (eBus._events['init']) { eBus._events['init'].pop() }
    if (eBus._events['video']) { eBus._events['video'].pop() }
    if (eBus._events['share']) { eBus._events['share'].pop() }
    if (eBus._events['consultInfo']) { eBus._events['consultInfo'].pop() }

    eBus.$on('init', param => {
      this.share = false;
      this.offVideo = {
        local: false,
        remote: false
      }
      this.offMic = {
        local: false,
        remote: false
      }
    })

    eBus.$on('video', param => {
      if (param.type === 'set') {
        if (param.hasOwnProperty('video')) {
          this.offVideo[param.id] = param.video;
          if (this.$refs.remoteVideo) this.$refs.remoteVideo.style = this.offVideo[param.id] ? `display: none` : `display: block`;
        }
        if (param.hasOwnProperty('audio')) {
          this.offMic[param.id] = param.audio;
        }
      } else {
        if (!this.$refs.remoteVideo) return;
        this.$refs.remoteVideo.srcObject = param.stream;
        this.$refs.remoteVideo.autoplay = true;
        this.$refs.remoteVideo.playsInline = true;
        this.interval = setInterval(this.intervalFunc, 1000);

        if (this.share && this.$store.state.isSharing) {
          this.handleVideoOffBtnClick();
        }
      }
    })

    eBus.$on('share', async param => {
      this.share = param.on;
      if (param.on) {
        let stream = await WebRTC.createVideoStream();
        if (!this.$refs.localVideo) return;
        this.$refs.localVideo.srcObject = stream;
        this.$refs.localVideo.autoplay = true;
        this.$refs.localVideo.muted = true;
        this.$refs.localVideo.playsInline = true;

        // peer 생성
        await WebRTC.createPeer();
        await WebRTC.createOffer('local');
      }
    });

    eBus.$on('consultInfo', param => {
      this.name = param.name;
    })
  },
  destroyed() {
    stopInterval();
    clearInterval(this.interval);
  },
  methods: {
    intervalFunc() {
      this.time = getIntervalTime();
    },
    handleVideoOffBtnClick() {
      this.offVideo.local = !this.offVideo.local;
      if (this.$refs.localVideo) this.$refs.localVideo.style = this.offVideo.local ? `display: none` : `display: block`;

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
    handleEndcallBtnClick() {
      let s = this.$store.state;
      window.resizeTo( 514, 606 );
      eBus.$emit('showVideo', { on: false });

      if (this.share) {
        eBus.$emit('menu', {
          on: false,
          menu: 'share'
        });

        eBus.$emit('chat', {
          type: 'notice',
          message: '화면 공유가 종료되었습니다.'
        });

        sendMessage('SessionReserveEnd', { userId: s.userInfo.id, roomId: s.roomInfo.roomId })
        sendMessage('ScreenShareConferenceEnd', { userId: s.userInfo.id, roomId: s.roomInfo.roomId, useMediaSvr: 'N' })
        this.$store.commit('setSharingStatus', false);
      } else {
        eBus.$emit('menu', {
          on: false,
          menu: 'call'
        });

        eBus.$emit('chat', {
          type: 'notice',
          message: '화상 상담이 종료되었습니다.'
        });
      }

      sendMessage('EndCall', { userId: s.userInfo.id, roomId: s.roomInfo.roomId });
      WebRTC.endCall();
    }
  }
}
</script>
