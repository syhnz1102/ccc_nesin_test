<template>
   <div class="chatHeader">
      <div v-if="!entrance" class="state waiting">상담 대기중</div>
      <!-- [i] 상담 진행 시 -->
      <div v-if="entrance" class="state start">상담 진행중</div>
      <div class="copy">
         <button @click="handleUrlCopyBtn">URL복사</button>
         <div v-if="showTooltip" class="tooltip">URL을 복사하여 상담 학생에게 공유하세요. <button @click="handleCloseBtn">close</button></div>
      </div>
   </div>
</template>

<script>
import { eBus } from "../../commons/eventBus";

export default {
  data() {
    return {
      entrance: false,
      showTooltip: true
    }
  },
  created() {
    eBus.$on('entrance', param => {
      console.log('statusBar = ', param)
      this.entrance = true;
    });
  },
  methods: {
    handleUrlCopyBtn() {
      let t = document.createElement("textarea");
      document.body.appendChild(t);
      t.value = window.location.href.split('/room/')[0] + '/student/room/' + window.location.href.split('/room/')[1];
      t.select();
      document.execCommand('copy');
      document.body.removeChild(t);

      // eBus.$emit('toast', '');
    },
    handleCloseBtn() {
      this.showTooltip = !this.showTooltip;
    }
  }
}
</script>

