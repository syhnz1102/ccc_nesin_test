<template>
   <div class="lnb">
      <div class="user">
         <div class="img"></div>
         <div class="info">
            <p>상담중인 학생이 없습니다.</p>
         </div>
         <!-- [i] 학생 입장 시
         <div class="info">
            <div class="name">홍길동</div>
            <div class="time">2020.01.01 00:00:00</div>
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