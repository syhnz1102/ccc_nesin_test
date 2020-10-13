<template>
  <div class="wrapper">
    <Popup
      v-if="popup.on"
      v-bind:type="popup.type"
      v-bind:title="popup.title"
      v-bind:contents="popup.contents"
      v-bind:option="popup.option"
      v-bind:ok="handlePopupOkBtnClick"
      v-bind:cancel="handlePopupCancelBtnClick"
    />
    <Header />
    <div class="container">
      <Chat />
      <Video
        v-if="isCalling && !isHiding"
        v-bind:isSharing="share"
      />
      <ProgressBar
        v-if="isCalling && isHiding"
        v-bind:share="share"
        @hideProgressBar="hideProgressBar"
      />
    </div>
  </div>
</template>

<script>
import Header from '@/components/student/Header'
import Chat from '@/components/student/Chat'
import Video from '@/components/student/Video'
import ProgressBar from '@/components/student/ProgressBar'
import Popup from '@/components/student/Popup'

import { eBus } from '../../commons/eventBus.js'
import store from "../../store";
import { sendMessage } from "../../commons/message";
import Session from "../../commons/session";
import { runningTime, stopInterval } from "../../commons/utils";

export default {
  components: {
    Header,
    Popup,
    Chat,
    Video,
    ProgressBar
  },
  data() {
    return {
      share: false,
      isCalling: false,
      isHiding: false,
      interval: null,
      counter: 0,
      popup: {
        on: false,
        type: '',
        title: '',
        contents: '',
        option: {},
        ok: null,
        cancel: null
      },
    }
  },
  async created() {
    store.commit('setRoomInfo', { roomId: window.location.href.split('/room/')[1] });

    if (!this.$store.state.studentName) {
      return this.$router.push({ path: '/student' });
    }

    const session = new Session();
    if (await session.connect()) {
      sendMessage('RoomJoin', { roomId: window.location.href.split('/room/')[1] });
    } else {
      session.close();
    }

    eBus.$on('showVideo', param => {
      console.log('showVideo Event : ', param);
      this.$store.commit('setCallingStatus', param.on);
      this.$store.commit('setSharingStatus', param.share);
      this.isCalling = param.on; // bool
      this.share = param.share;

      if (!param.on) {
        stopInterval();
      }
    })

    eBus.$on('share', param => {
      this.share = param.on;
    })

    eBus.$on('popup', param => {
      this.popup.on = param.on;
      this.popup.type = param.type;
      this.popup.title = param.title;
      this.popup.contents = param.contents;
      this.popup.option = param.option;
      this.popup.ok = param.ok;
      this.popup.cancel = param.cancel;
    });

    eBus.$on('progressBar', param => {
      console.log('progressBar Event : ', param);
      this.isCalling = param.on; // bool
      this.isHiding = param.on;
    })
  },
  destroyed() {
    stopInterval();
  },
  methods: {
    handlePopupOkBtnClick(param) {
      this.popup.on = false;
      if (this.popup.ok) this.popup.ok(param);
    },
    handlePopupCancelBtnClick(param) {
      this.popup.on = false;
      if (this.popup.cancel) this.popup.cancel(param);
    },
    hideProgressBar(param) {
      this.isHiding = param.on;
    }
  }
}
</script>

<style>
  @import '../../assets/student/css/student.css';
</style>
