<!--불필요한컴포넌트 (v-if로만 다 처리)-->

<template>
   <div class="videoContainer">
      <div class="mainVideo">
         <div class="video camoff"><!--클래스바인딩 from학생이 서버로 보낸 data-->
            <div class="micoff"></div><!--클래스바인딩 from학생이 서버로 보낸 data-->
            <!-- <video style="background:url('@/assets/consultant/images/img_video_sample2.jpg') no-repeat center 0;background-size:cover"></video> -->
         </div>
         <div class="video local camoff"><!--클래스바인딩 this.cam-->
            <div class="micoff"></div><!--클래스바인딩 this.mic-->
            <!-- <video style="background:url('@/assets/consultant/images/img_video_sample1.jpg') no-repeat center 0;background-size:cover"></video> -->
         </div>
      </div>
      <div class="videobarContainer">
         <div class="menu">
            <div class="info">
               <span>홍길동</span>
               <span>00:00</span>
            </div>
            <div class="button">
               <button class="cam off"></button><!--@click-->
               <button class="mic off"></button><!--@click-->
               <button class="endcall"></button><!--@click-->
            </div>
         </div>
      </div>
   </div>   
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
    }
  }
}
</script>

<style>
  @import '../../../assets/consultant/css/consultant.css';
</style>