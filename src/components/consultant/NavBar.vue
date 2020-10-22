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
         <button @click="handleKickBtnClick">강제퇴장</button>
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
import { sendMessage } from '../../commons/message';

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
    if (eBus._events['entranceNavbar']) { eBus._events['entranceNavbar'].pop() }
    if (eBus._events['menu']) { eBus._events['menu'].pop() }
    if (eBus._events['startShare']) { eBus._events['startShare'].pop() }

    eBus.$on('entranceNavbar', param => {
      // console.log('navBar = ', param)
      this.entrance = param.entrance;
      this.studentInfo.name = param.name;
      this.studentInfo.time = now()
    });

    eBus.$on('menu', param => {
      this.menu[param.menu] = param.on;
    })

    eBus.$on('startShare', param => {
      let s = this.$store.state;

      if (this.menu.share) {
        sendMessage('SessionReserve', { userId: s.userInfo.id, roomId: s.roomInfo.roomId })
      } else {
        sendMessage('SessionReserveEnd', { userId: s.userInfo.id, roomId: s.roomInfo.roomId })
        sendMessage('ScreenShareConferenceEnd', { userId: s.userInfo.id, roomId: s.roomInfo.roomId, useMediaSvr: 'N' })
      }
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

      if (this.menu.call) {
        return eBus.$emit('popup', {
          on: true,
          type: 'Alert',
          title: '화상 상담',
          contents: '화상 상담이 진행 중입니다.'
        })
      }

      if (this.menu.share) {
        return eBus.$emit('popup', {
          on: true,
          type: 'Alert',
          title: '화상 상담',
          contents: '화면 공유가 진행 중입니다. 화면 공유를 종료하고 시작해주세요.'
        })
      }

      let checked = window.localStorage.getItem('IS_CHECKED_DEVICE') ? JSON.parse(window.localStorage.getItem('IS_CHECKED_DEVICE').toLowerCase()) : false;

      if (!checked) {
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
      } else {
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
      }
    },
    handleShareBtnClick() {
      if (!this.$store.state.isJoined) {
        return eBus.$emit('popup', {
          on: true,
          type: 'Alert',
          title: '화상 상담',
          contents: '상담 시작 후 화상 상담을 진행할 수 있습니다.'
        })
      }

      if (this.menu.call) {
        return eBus.$emit('popup', {
          on: true,
          type: 'Alert',
          title: '화상 상담',
          contents: '화상 상담이 진행 중입니다. 화상 상담을 종료하고 시작해주세요.'
        })
      }

      if (this.menu.share) {
        return eBus.$emit('popup', {
          on: true,
          type: 'Alert',
          title: '화상 상담',
          contents: '화면 공유가 진행 중입니다.'
        })
      }

      let checked = window.localStorage.getItem('IS_CHECKED_DEVICE') ? JSON.parse(window.localStorage.getItem('IS_CHECKED_DEVICE').toLowerCase()) : false;

      if (!checked) {
        eBus.$emit('popup', {
          on: true,
          type: 'Settings',
          title: '디바이스 설정',
          contents: '화면 공유 시작 전 카메라와 마이크가 정상 동작하는지 확인하세요.',
          option: { inCall: false, start: true },
          ok: () => {
            this.menu.share = !this.menu.share;

            if (this.menu.share) {
              // Call 상태
              eBus.$emit('showVideo', { on: true, type: 'share' });
              window.resizeTo(854, 606);
            } else {
              // Call 상태 아님
              eBus.$emit('showVideo', { on: false });
              window.resizeTo(514, 606);
            }
          },
          cancel: () => {
          }
        });
      } else {
        this.menu.share = !this.menu.share;

        if (this.menu.share) {
          // Call 상태
          eBus.$emit('showVideo', { on: true, type: 'share' });
          window.resizeTo(854, 606);
        } else {
          // Call 상태 아님
          eBus.$emit('showVideo', { on: false });
          window.resizeTo(514, 606);
        }
      }
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
    },
    handleKickBtnClick() {
      sendMessage('KickOut', { userId: Object.keys(this.$store.state.roomInfo.members).filter(c => c !== this.$store.state.userInfo.id)[0], roomId: this.$store.state.roomInfo.roomId })
    }
  }
}
</script>
