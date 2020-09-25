<template>
   <div class="lnb">
      <div class="user">
         <div class="img"></div>
         <div v-if="!entrance" class="info">
            <p>상담중인 학생이 없습니다.</p>
         </div>
         <!-- [i] 학생 입장 시-->
         <div v-if="entrance" class="info">
            <div class="name">홍길동</div>
            <div class="time">2020.01.01 00:00:00</div>
         </div>
      </div>
      <div class="menu">
         <ul>
            <li :class="{ on: isOn == 'videoClicked' }">
               <button @click="handleVideoBtnClick">화상상담</button>
            </li>
            <li :class="{ on: isOn == 'displayShareClicked' }">
               <button>화면공유</button>
            </li>
            <li :class="{ on: isOn == 'deviceClicked' }">
               <button @click="handleSettingBtnClick">설정</button>
            </li>
         </ul>
      </div>
   </div>
</template>

<script>
import { eBus } from '../../../commons/eventBus.js'

export default {
  data() {
    return {
       entrance: false,
       isOn: 'notClicked',
       videoOn: 'noVideo',
       display: false,
       videoInfo: [],
    }
  },
  created() {
      eBus.$on('closeDeviceStandard', bool => {
         this.isOn = 'notClicked';
      });
      eBus.$on('closeDeviceOnPlay', bool => {
         this.isOn = 'videoClicked';
      });
  },
  methods: {
      handleVideoBtnClick() {
         if( !this.display ){
            window.resizeTo( 854, 606 );
            this.videoInfo = {
               isOn: 'videoClicked',
               videoOn: 'videoOn'
            };
            eBus.$emit('videoOn', this.videoInfo);
         } else {
            window.resizeTo( 514, 606 );
            this.videoInfo = {
               isOn: 'notClicked',
               videoOn: 'noVideo'
            };
            eBus.$emit('noVideo', this.videoInfo);
         }
         this.display = !this.display;
      },
      handleSettingBtnClick() {
         this.isOn = 'deviceClicked';
         if( !this.display ){
            eBus.$emit('deviceStandard', true);
         } else if ( this.display && this.videoOn == 'videoOn' ){
            eBus.$emit('deviceOnPlay', true);
         }
      }
  }
}
</script>