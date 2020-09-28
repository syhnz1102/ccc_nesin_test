<template>
  <div class="modal">
    <div class="modalContainer">
      <div class="modalContent">
          <p>{{ popContent }}</p>
          <div class="button">
            <button class="submit" @click="handleSubmitBtnClick">확인</button>
            <button class="cancel" @click="handleCancelBtnClick">취소</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { eBus } from '../../../commons/eventBus.js'

export default {
  props: { contents: String },
  data() {
    return {
      video: {
        videoOn:false,
        shareOn:false,
        videoHideOn:false,
        shareHideOn:false
      },
      popUp: {//popUp닫는 emit용
        on: false,
        contents: ''
      },
      popContent: this.contents
    }
  },
  created() {
    console.log(this.contents);
  }, 
  methods: {
    handleSubmitBtnClick() {//화상,화면공유만 다 끄고 채팅만남게
      eBus.$emit('video', this.video);
      eBus.$emit('popUp', this.popUp);
    },
    handleCancelBtnClick() {
      eBus.$emit('popUp', this.popUp);
    }
  }
}
</script>