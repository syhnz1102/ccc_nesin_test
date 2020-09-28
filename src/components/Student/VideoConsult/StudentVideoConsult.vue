<template>
   <div class="videoContainer">
      <div class="mainVideo">
         <div class="video" v-bind:class="{ 'camoff': offVideo }">
            <div v-if="offMic" class="micoff"></div>
            <video @click="handleVideoClick" style="background:url('@/assets/student/images/img_video_sample2.jpg') no-repeat center 0;background-size:cover"></video>
         </div>
         <div class="video local" v-bind:class="{ 'camoff': offVideo }">
            <div v-if="offMic" class="micoff"></div>
            <video style="background:url('@/assets/student/images/img_video_sample1.jpg') no-repeat center 0;background-size:cover"></video>
         </div>
      </div>
      <VideoConsultBtn
         v-if="!hideBtn"
         @Btn="btnBinder"
      />
   </div>
</template>

<script>
import VideoConsultBtn from '@/components/student/VideoConsult/StudentVideoConsultBtn'

export default {
   components: {
      VideoConsultBtn
   },
   data() {
      return {
         offVideo: false,
         offMic: false,
         hideBtn: true
      }
   },
   methods: {
      handleVideoClick() {
         this.hideBtn = !this.hideBtn;
      },
      btnBinder(param) {
         this.offVideo = param.offVideo,
         this.offMic = param.offMic
      }
   }
}
</script>