<template>
   <div class="lnb">
      <div class="user">
         <div class="img"></div>
         <div v-if="!entrance" class="info">
            <p>상담중인 학생이 없습니다.</p>
         </div>
         <!-- [i] 학생 입장 시-->
         <div v-if="entrance" class="info">
            <div class="name">{{ studentInfo.name }}</div>
            <div class="time">{{ studentInfo.time }}</div>
         </div>
      </div>
      <div class="menu">
         <ul>
            <li :class="{ on: menu === 'call' }">
               <button @click="handleVideoBtnClick">화상상담</button>
            </li>
            <li :class="{ on: menu === 'share' }">
               <button @click="handleShareBtnClick">화면공유</button>
            </li>
            <li :class="{ on: menu === 'setting' }">
               <button @click="handleSettingBtnClick">설정</button>
            </li>
         </ul>
      </div>
   </div>
</template>

<script>
import { eBus } from '../../commons/eventBus.js'
import { now } from '../../commons/utils';

export default {
  data() {
    return {
      entrance: false,
      menu: '', // call, share, setting
      studentInfo: {
        name: '',
        time: ''
      }
    }
  },
  created() {
    eBus.$on('entrance', param => {
      console.log('navBar = ', param)
      this.entrance = param.entrance;
      this.studentInfo.name = param.name;
      this.studentInfo.time = now()
    });

    // eBus.$on('closeDeviceStandard', bool => {
    //    this.isOn = 'notClicked';
    // });
    // eBus.$on('closeDeviceOnPlay', bool => {
    //    this.isOn = 'videoClicked';
    // });
  },
  methods: {
    handleVideoBtnClick() {
      // return alert('현재 준비 중인 기능입니다.');
      if (!this.$store.state.isJoined) return alert('상담 시작 후 통화를 진행할 수 있습니다.');
      this.menu = this.menu === 'call' ? '' : 'call';

      if (this.menu === 'call') {
        // Call 상태
        eBus.$emit('showVideo', { on: true });
        window.resizeTo( 854, 606 );
      } else {
        // Call 상태 아님
        eBus.$emit('showVideo', { on: false });
        window.resizeTo( 514, 606 );
      }
    },
    handleShareBtnClick() {
      return alert('현재 준비 중인 기능입니다.');
    },
    handleSettingBtnClick() {
      return alert('현재 준비 중인 기능입니다.');

      // this.isOn = 'deviceClicked';
    }
  }
}
</script>
