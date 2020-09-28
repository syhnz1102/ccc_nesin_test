<template>
   <div class="videoContainer">
      <div class="shareVideo">
         <div class="video">
            <div v-if="offMic" class="micoff"></div>
            <video @click="handleShareVideoClick" style="background:url('@/assets/student/images/img_video_sample3.jpg') no-repeat center center #111;background-size:contain"></video>
         </div>
      </div>
      <DisplayShareBtn
         v-if="!hideBtn"
         @Btn="btnBinder"
      />
   </div>
</template>

<script>
import DisplayShareBtn from '@/components/student/DisplayShare/StudentDisplayShareBtn'

export default {
   components: {
      DisplayShareBtn
   },
  data() {
    return {
       offMic: false,
       hideBtn: true
    }
  },
  methods: {
     handleShareVideoClick() {
        this.hideBtn = !this.hideBtn;
     },
     btnBinder(param) {
        this.offMic = param;
     }
  }
}
</script>