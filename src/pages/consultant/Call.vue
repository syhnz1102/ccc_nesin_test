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
    <div v-if="toast" class="toast">
      <p>{{ toast }}</p>
    </div>
    <Header />
    <NavBar />
    <div class="container">
      <Chat />
      <Video v-if="isCalling" v-bind:isSharing="isSharing" />
    </div>
  </div>
</template>

<script>
import Popup from '@/components/consultant/Popup';
import Header from '@/components/consultant/Header';
import NavBar from '@/components/consultant/NavBar';
import Chat from '@/components/consultant/Chat';
import Video from '@/components/consultant/Video';
import { eBus } from "../../commons/eventBus";

export default {
  components: {
    Popup,
    NavBar,
    Header,
    Chat,
    Video
  },
  data() {
    return {
      toast: '',
      isSharing: false,
      isCalling: false,
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
  created() {
    eBus.$on('showVideo', param => {
      console.log('showVideo Event : ', param);
      this.$store.commit('setCallingStatus', param.on);
      this.isCalling = param.on; // bool
      this.isSharing = param.type === 'share';
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

    eBus.$on('toast', contents => {
      if (this.timeout) clearTimeout(this.timeout);
      this.toast = contents;
      this.timeout = setTimeout(() => {
        this.toast = '';
      }, 500)
    })
  },
  destroyed() {
    if (this.$store.state.socket) this.$store.state.socket.close();
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
  }
}
</script>

<style>
  @import '../../assets/consultant/css/consultant.css';
</style>
