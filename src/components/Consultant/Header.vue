<template>
   <div class="header">
      <div class="logo">
         <span class="img">
            <img src="@/assets/consultant/images/img_logo_sample.png" />
         </span>
         <strong>화상 상담</strong>
      </div>
      <div class="button">
         <button @click="handleExitBtn">상담종료</button>
      </div>
   </div>
</template>

<script>
import router from "../../router";
import { sendMessage } from '../../commons/message';

export default {
  data() {
    return {

    }
  },
  methods: {
    handleExitBtn() {
      sendMessage('ExitRoom', { roomId: window.location.href.split('/room/')[1] });
      router.push({ path: `/main` });
    }
  }
}
</script>
