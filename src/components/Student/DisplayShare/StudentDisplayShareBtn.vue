<template>
   <div class="wrapper">
      <div class="header">
         <div class="logo">
            <span class="img">
               <img src="@/assets/student/images/img_logo_sample.png" />
            </span>
            <strong>화상 상담</strong>
         </div>
         <div class="button">
            <button>상담종료</button>
         </div>
      </div>
      <div class="container">
         <div class="chatContainer">
            <div class="chatContent">
               <p>상담이 개설되었습니다.</p>
               <p>홍길동님이 입장하였습니다.</p>
               <div class="message right">
                  <div class="bubble">
                     <p>안녕하세요.</p>
                  </div>
                  <div class="bubble">
                     <span class="time">오후 00:00</span>
                     <p>한국대학교입니다.</p>
                  </div>
               </div>
               <div class="message left">
                  <div class="name">홍길동</div>
                  <div class="bubble">
                     <p>안녕하세요.</p>
                  </div>
                  <div class="bubble">
                     <p>홍길동입니다.</p>
                  </div>
                  <div class="bubble">
                     <p>입시상담요청 드려요.</p>
                     <span class="time">오후 00:00</span>
                  </div>
               </div>
               <div class="message right">
                  <div class="bubble">
                     <p>화상으로 상담드리겠습니다.</p>
                  </div>
                  <div class="bubble">
                     <span class="time">오후 00:00</span>
                     <p>화면이 나오는걸 원치 않으시면 카메라를 꺼주시면 됩니다.</p>
                  </div>
               </div>
               <p>화상 상담이 시작되었습니다.</p>
            </div>
            <div class="chatInput">
               <input tyle="text" placeholder="메시지를 입력하세요.">
               <button>전송</button>
            </div>
         </div>
         <div class="videoContainer">
            <div class="shareVideo">
               <div class="video">
                  <div class="micoff"></div>
                  <video style="background:url('@/assets/student/images/img_video_sample3.jpg') no-repeat center center #111;background-size:contain"></video>
               </div>
            </div>
            <div class="buttonContainer">
               <div class="topButton">
                  <div class="button">
                     <button class="hide"></button>
                  </div>
               </div>
               <div class="bottomButton">
                  <div class="button">
                     <button class="mic"></button>
                     <button class="endCall"></button>
                  </div>
               </div>
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
   @import '../../../assets/student/css/student.css';
</style>