<template>
   <div class="lnb">
      <div class="user">
         <div class="img"></div>
         <div v-if="!entrance" class="info">
            <p>상담중인 학생이 없습니다.</p>
         </div>
         <!-- [i] 학생 입장 시-->
         <div v-if="entrance" class="info">
            <div class="name">홍길동</div>
            <div class="time">2020.01.01 00:00:00</div>
         </div>
      </div>
      <div class="menu">
         <ul>
            <li :class="{ on: isOn == 1 }">
               <button @click="videoButton">화상상담</button>
               <!-- <button>화상상담</button> -->
            </li>
            <li :class="{ on: isOn == 2 }">
               <button>화면공유</button>
            </li>
            <li :class="{ on: isOn == 3 }">
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
       entrance:false,
       isOn:0, //0:기본상담 1: 화상상담 2:화면공유 3:설정
       display:false
    }
  },
  methods: {
     videoButton : function () {
      if(!this.display){
         // resizeBy
         // window.resizeBy(340, 0)

         // 원래값
         // window.resizeTo(848, 538)

         // inner에 맞춘 값 - 버튼종류가 늘어남에 따라 중복해서 늘어나는현상 방지
         window.resizeTo(862, 604)
         this.isOn = 1;
         
      }else{
         // resizeBy
         // window.resizeBy(340, 0)

         // 원래값
         // window.resizeTo(508, 538)

         // inner에 맞춘 값
         window.resizeTo(522, 604)
         this.isOn = 0;
      }
      this.display = !this.display;
    }
  }
}
</script>

<style>
  @import '../../../assets/consultant/css/consultant.css';
</style>