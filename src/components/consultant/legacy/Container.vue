<template>
  <div class="container">
    <div class="chatContainer">
      <StatusBar />
      <div class="chatContent">
        <p>상담이 개설되었습니다.</p>
      </div>
      <div class="chatInput">
        <input type="text" placeholder="메시지를 입력하세요." v-on:keyup.enter="handleSendBtnClick" />
        <button @click="handleSendBtnClick">전송</button>
      </div>
    </div>
    <Video v-if="isCalling" />
  <!--      <DeviceStandard v-if="standardSetting" />-->
  <!--      <DeviceStart v-if="firstSetting" />-->
  <!--      <DeviceOnplay v-if="onPlaysetting" />-->
  <!--      <VideoConsult v-if="videoOn == 'videoOn'" />-->
  </div>
</template>

<script>
import StatusBar from '../StatusBar';
import Video from '../Video';
import StudentEntrance from './Consult/ConsultantConsultStudentEntrance'
import DeviceStandard from './Consult/ConsultantConsultDevice'
// import DeviceStart from './VideoConsult/ConsultantVideoConsultDeviceStart'
// import DeviceOnplay from './VideoConsult/ConsultantVideoConsultDeviceOnPlay'
import { eBus } from '../../../commons/eventBus.js'

export default {
  components: {
    StatusBar,
    StudentEntrance,
    Video
    // VideoConsult,
    // DeviceStandard,
    // DeviceStart,
    // DeviceOnplay
  },
  name: 'Container',
  data() {
    return {
      isCalling: false,

      // entrance:false,
      // videoOn: 'noVideo',
      // isOn: 'notClicked',
      // firstSetting: false,
      // onPlaysetting: false,
      // standardSetting: false
    }
  },
  created() {
    eBus.$on('videoOn', videoInfo => {
       this.isOn = videoInfo.isOn;
       this.videoOn = videoInfo.videoOn;
       this.firstSetting= true;
    });
    eBus.$on('noVideo', videoInfo => {
       this.isOn = videoInfo.isOn;
       this.videoOn = videoInfo.videoOn;
    });
    eBus.$on('closeDeviceStart', bool => {
       this.firstSetting = bool;
    });
    eBus.$on('deviceOnPlay', bool => {
       this.onPlaysetting = bool;
       this.isOn = 'deviceClicked';
    }),
    eBus.$on('closeDeviceOnPlay', bool => {
       this.onPlaysetting = bool;
       this.isOn = 'notClicked';
    }),
    eBus.$on('deviceStandard', bool => {
       this.standardSetting = bool;
    }),
    eBus.$on('closeDeviceStandard', bool => {
       this.standardSetting = bool;
       this.isOn = 'notClicked';
    })
  },
  methods: {
    handleSendBtnClick() {
      if (!this.$store.state.isCalling) {
        console.warn('통화가 시작된 뒤 채팅을 시작할 수 있습니다.');
        return false;
      }
    }
  }
}
</script>
