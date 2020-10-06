<template>
  <div class="wrapper">
<!--    <PopUp-->
<!--       v-if="popUp.on"-->
<!--       v-bind:contents="popUp.contents"-->
<!--    />-->
    <Header />
    <div class="container">
      <Chat />
      <Video v-if="isCalling && !isHiding" />
      <ProgressBar
        v-if="isCalling && isHiding" 
        @hideProgressBar="hideProgressBar"
      />
    </div>
  </div>
</template>

<script>
// import PopUp from '@/components/student/PopUp/StudentPopUp'
import Header from '@/components/student/Header'
import Chat from '@/components/student/Chat'
import Video from '@/components/student/Video'
import ProgressBar from '@/components/student/ProgressBar'

import { eBus } from '../../commons/eventBus.js'
import store from "../../store";
import { sendMessage } from "../../commons/message";
import Session from "../../commons/session";
import { runningTime } from "../../commons/utils";

export default {
  components: {
    Header,
    // PopUp,
    Chat,
    Video,
    ProgressBar
  },
  data() {
    return {
      isCalling: false,
      isHiding: false,
      interval: null,
      counter: 0,
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

      if (param.on) {
        // interval 켜기 store에 집어 넣기
        // this.$store.commit('setRunningTimeInfo', false);//screenShare
        this.interval = setInterval(this.intervalFunc, 1000);
      }
    })

    eBus.$on('progressBar', param => {
      console.log('progressBar Event : ', param);
      this.isCalling = param.on; // bool
      this.isHiding = param.on;
    })

    // eBus.$on('popUp', param => {//여기서 popUp으로의 컨텐츠전달은 prop으로
    //    this.popUp.on = param.on;
    //    this.popUp.contents = param.contents;
    // });
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    intervalFunc() {
      this.$store.commit('setRunningTimeInfo', runningTime(this.counter++));
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
