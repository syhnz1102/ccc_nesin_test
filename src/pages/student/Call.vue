<template>
  <div class="wrapper">
<!--    <PopUp-->
<!--       v-if="popUp.on"-->
<!--       v-bind:contents="popUp.contents"-->
<!--    />-->
    <Header />
    <div class="container">
      <Chat />
      <Video v-if="isCalling" />
    </div>
  </div>
</template>

<script>
// import PopUp from '@/components/student/PopUp/StudentPopUp'
import Header from '@/components/student/Header'
import Chat from '@/components/student/Chat'
import Video from '@/components/student/Video'

import { eBus } from '../../commons/eventBus.js'
import store from "../../store";
import { sendMessage } from "../../commons/message";
import Session from "../../commons/session";

export default {
  components: {
    Header,
    // PopUp,
    Chat,
    Video
  },
  data() {
    return {
      isCalling: false
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
      this.isCalling = param.on; // bool
    })
    // eBus.$on('popUp', param => {//여기서 popUp으로의 컨텐츠전달은 prop으로
    //    this.popUp.on = param.on;
    //    this.popUp.contents = param.contents;
    // });
  },
}
</script>

<style>
  @import '../../assets/student/css/student.css';
</style>
