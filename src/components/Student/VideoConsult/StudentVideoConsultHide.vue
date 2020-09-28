<template>
   <div class="videobarContainer">
      <div class="menu">
         <div class="info">
            <span>화상 상담중</span>
            <span>00:00</span>
         </div>
         <div class="button">
            <button @click="handleVideoExitBtnClick">close</button>
         </div>
      </div>
   </div>
</template>

<script>
import { eBus } from '../../../commons/eventBus.js'

export default {
  data() {
    return {
       popUp: {
          on: true,
          contents: '화상 상담을 종료하시겠습니까?'
       }
    }
  },
  methods: {
     handleVideoExitBtnClick() {//누르면 call.vue에서 팝업호출
        eBus.$emit('popUp', this.popUp);
     }
  }
}
</script>