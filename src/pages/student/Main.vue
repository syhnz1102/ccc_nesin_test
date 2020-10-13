<template>
    <div class="wrapper">
      <div class="mainContainer">
         <div class="boxContainer">
            <div class="box">
<!--               <div class="logo">-->
<!--                  <span class="img">-->
<!--                     <img src="@/assets/student/images/img_logo_sample.png"/>-->
<!--                  </span>-->
<!--               </div>-->
               <div class="text">
                  <strong>쉽고 편리한<br /> 화상 상담 서비스</strong>
                  <p>이름을 입력하고 상담을 시작해보세요.</p>
               </div>
<!--               <div class="input">-->
<!--                  <input ref="name" type="text" placeholder="이름을 입력하세요.">-->
<!--               </div>-->
               <div class="button">
                  <button @click="handleStartBtnClick">상담 시작하기</button>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import store from "../../store";

export default {
  data() {
    return {
    }
  },
  created() {
     document.onkeydown = this.doNotReload;
  },
  methods: {
    handleStartBtnClick() {
      store.commit('setStudentName', 'temp');
      this.$router.push({ path: `/student/room/${this.$store.state.roomInfo.roomId}` });
    },
    doNotReload(event) {
      if ((event.ctrlKey && (event.keyCode === 78 || event.keyCode === 82)) || (event.keyCode === 116)) {//ctrl+n, ctrl+r, f5
        return confirm("새로고침 시 서비스가 정상적으로 동작하지 않을 수 있습니다. \n새로고침 하시겠습니까?");
      }
    }
  }
}
</script>

<style>
  @import '../../assets/student/css/student.css';
</style>
