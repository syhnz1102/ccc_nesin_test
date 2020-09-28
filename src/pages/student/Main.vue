<template>
    <div class="wrapper">
      <div class="mainContainer">
         <div class="boxContainer">
            <div class="box">
               <div class="logo">
                  <span class="img">
                     <img src="@/assets/student/images/img_logo_sample.png"/>
                  </span>
               </div>
               <div class="text">
                  <strong>쉽고 편리한<br /> 화상 상담 서비스</strong>
                  <p>이름을 입력하고 상담을 시작해보세요.</p>
               </div>
               <div class="input">
                  <input ref="name" type="text" placeholder="이름을 입력하세요.">
               </div>
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
  methods: {
    handleStartBtnClick() {
      store.commit('setStudentName', this.$refs.name.value);
      this.$router.push({ path: `/student/room/${this.$store.state.roomInfo.roomId}` });
    }
  }
}
</script>

<style>
  @import '../../assets/student/css/student.css';
</style>
