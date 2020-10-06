<template>
    <div class="mainContainer">
      <div class="boxContainer">
          <div class="box">
            <div class="logo">
                <span class="img">
                  <!-- <img src="@/assets/consultant/images/img_logo_sample.png" /> -->
                  <img src="http://knowledgepoint.co.kr/file/sample/img_logo_sample.png" /> <!--로고URL-->
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
</template>

<script>
import Session from "../../commons/session";
import { sendMessage } from '../../commons/message';

export default {
  data() {
    return {
    }
  },
  methods: {
    async handleStartBtnClick() {
      const session = new Session();
      if (await session.connect()) {
        sendMessage('CreateRoom', {});
      } else {
        session.close();
      }
    }
  }
}
</script>

<style>
  @import '../../assets/consultant/css/consultant.css';
</style>
