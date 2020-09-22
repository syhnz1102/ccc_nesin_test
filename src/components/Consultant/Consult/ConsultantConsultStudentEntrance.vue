<template>
    <div class="wrapper">
      <div class="header">
         <div class="logo">
            <span class="img">
               <img src="@/assets/consultant/images/img_logo_sample.png" />
            </span>
            <strong>화상 상담</strong>
         </div>
         <div class="button">
            <button>상담종료</button>
         </div>
      </div>
      <div class="lnb">
         <div class="user">
            <div class="img"></div>
            <div class="info">
               <div class="name">홍길동</div>
               <div class="time">2020.01.01 00:00:00</div>
            </div>
            <!-- [i] 학생 입장 전
            <div class="info">
               <p>상담중인 학생이 없습니다.</p>
            </div>
            -->
         </div>
         <div class="menu">
            <ul>
               <li>
                  <button>화상상담</button>
               </li>
               <li>
                  <button>화면공유</button>
               </li>
               <li>
                  <button>설정</button>
               </li>
            </ul>
         </div>
      </div>
      <div class="container">
         <div class="chatContainer">
            <div class="chatHeader">
               <div class="state start">상담 진행중</div>
               <!-- [i] 상담 진행 전
                  <div class="state start">상담 대기중</div>
               -->
               <div class="copy">
                  <button>URL복사</button>
                  <!-- <div class="tooltip">URL을 복사하여 상담 학생에게 공유하세요. <button>close</button></div> -->
               </div>
            </div>
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
               <p>화상상담이 시작되었습니다.</p>
            </div>
            <div class="chatInput">
               <input tyle="text" placeholder="메시지를 입력하세요.">
               <button>전송</button>
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