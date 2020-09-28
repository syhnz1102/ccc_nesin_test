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

  },
  destroyed() {
    if (this.$store.state.socket) this.$store.state.socket.close();
  }
}
</script>

<style>
  @import '../../assets/consultant/css/consultant.css';
</style>
