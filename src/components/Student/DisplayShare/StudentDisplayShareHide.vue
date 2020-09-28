<template>
   <div class="videobarContainer">
      <div class="menu">
         <div class="info">
            <span>화면 공유중</span>
            <span>00:00</span>
         </div>
         <div class="button">
            <button @click="clickExitBtn">close</button>
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
            contents: '화면 공유를 종료하시겠습니까?'//exit msg
         },

      }
   },
   methods: {
      clickExitBtn() {
         eBus.$emit('popUp', this.popUp);
      }
   }
}
</script>