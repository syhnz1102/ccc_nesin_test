<template>
  <div class="wrapper">
    <div class="mainContainer">
      <div class="boxContainer">
        <div class="box">
          <div class="logo">
              <span class="img">
                <img v-bind:src="logoURL" />
              </span>
          </div>
          <div class="text">
              <strong>쉽고 편리한<br /> 화상 상담 서비스</strong>
              <p>아래 버튼을 눌러 상담을 시작해보세요.</p>
          </div>
          <div class="button">
              <button @click="handleStartBtnClick">상담 시작하기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Session from "../../commons/session";
import { sendMessage } from '../../commons/message';
import { eBus } from '../../commons/eventBus';
import store from "../../store";

export default {
  data() {
    return {
      logoURL: ''
    }
  },
  created() {
    this.logoURL = unescape(window.location.href.split('logoURL=')[1]);
    // eBus.$emit('logoURL', this.logoURL);
    this.$store.commit('setLogoURL', this.logoURL);
    document.onkeydown = this.doNotReload
  },
  methods: {
    async handleStartBtnClick() {
      const session = new Session();
      if (await session.connect()) {
        sendMessage('CreateRoom', {});
      } else {
        session.close();
      }
    },
    doNotReload() {
      if ((event.ctrlKey && (event.keyCode === 78 || event.keyCode === 82)) || (event.keyCode === 116)) {//ctrl+n, ctrl+r, f5
        return confirm("새로고침 시 서비스가 정상적으로 동작하지 않을 수 있습니다. \n새로고침 하시겠습니까?");
      } 
    }
  }
}
</script>

<style>
  @import '../../assets/consultant/css/consultant.css';
</style>
