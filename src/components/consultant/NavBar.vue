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
            <li :class="{ on: menu.call }">
               <button @click="handleVideoBtnClick">화상상담</button>
            </li>
            <li :class="{ on: menu.share }">
               <button @click="handleShareBtnClick">화면공유</button>
            </li>
            <li :class="{ on: menu.setting }">
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
      menu: {
        call: false,
        share: false,
        setting: false
      },
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

    eBus.$on('menu', param => {
      this.menu[param.menu] = param.on;
    })
  },
  methods: {
    handleVideoBtnClick() {
      if (!this.$store.state.isJoined) {
        return eBus.$emit('popup', {
          on: true,
          type: 'Alert',
          title: '화상 상담',
          contents: '상담 시작 후 화상 상담을 진행할 수 있습니다.'
        })
      }

      if (this.$store.state.isCalling) {
        return eBus.$emit('popup', {
          on: true,
          type: 'Alert',
          title: '화상 상담',
          contents: '화상 상담이 진행 중입니다.'
        })
      }

      eBus.$emit('popup', {
        on: true,
        type: 'Settings',
        title: '디바이스 설정',
        contents: '화상 상담 시작 전 카메라와 마이크가 정상 동작하는지 확인하세요.',
        option: { inCall: false, start: true },
        ok: () => {
          this.menu.call = !this.menu.call;

          if (this.menu.call) {
            // Call 상태
            eBus.$emit('showVideo', { on: true });
            window.resizeTo(854, 606);
            
            eBus.$emit('chat', {
              type: 'notice',
              message: '화상 상담이 시작되었습니다.'
            });
          } else {
            // Call 상태 아님
            eBus.$emit('showVideo', { on: false });
            window.resizeTo(514, 606);
          }
        },
        cancel: () => {
        }
      })
    },
    handleShareBtnClick() {
      if (!this.$store.state.isJoined || !this.$store.state.isCalling) {
        return eBus.$emit('popup', {
          on: true,
          type: 'Alert',
          title: '화면 공유',
          contents: '화상 상담 시작 후 화면 공유를 진행할 수 있습니다.'
        })
      }

      this.menu.share = !this.menu.share;
      eBus.$emit('share', { on: this.menu.share });
    },
    handleSettingBtnClick() {
      this.menu.setting = !this.menu.setting;

      eBus.$emit('popup', {
        on: true,
        type: 'Settings',
        title: '디바이스 설정',
        contents: this.$store.state.isCalling ? '화상 상담중에는 디바이스 설정을 변경할 수 없습니다.' : '',
        option: { inCall: this.$store.state.isCalling, start: false },
        ok: () => {
          this.menu.setting = false;
        },
        cancel: () => {
          this.menu.setting = false;
        }
      })
    }
  }
}
</script>
