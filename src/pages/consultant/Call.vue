<template>
  <div class="wrapper">
    <Header />
    <NavBar />
    <div class="container">
      <Chat />
      <Video v-if="isCalling" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/consultant/Header';
import NavBar from '@/components/consultant/NavBar';
import Chat from '@/components/consultant/Chat';
import Video from '@/components/consultant/Video';
import { eBus } from "../../commons/eventBus";

export default {
  components: {
    NavBar,
    Header,
    Chat,
    Video
  },
  data() {
    return {
      isCalling: false
    }
  },
  created() {
    eBus.$on('showVideo', param => {
      console.log('showVideo Event : ', param);
      this.$store.commit('setCallingStatus', param.on);
      this.isCalling = param.on; // bool
    })
  },
  destroyed() {
    if (this.$store.state.socket) this.$store.state.socket.close();
  }
}
</script>

<style>
  @import '../../assets/consultant/css/consultant.css';
</style>
