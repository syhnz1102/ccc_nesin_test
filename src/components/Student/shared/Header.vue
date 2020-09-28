<template>
   <div class="header">
      <div class="logo">
         <span class="img">
            <img src="@/assets/student/images/img_logo_sample.png" />
         </span>
         <strong>화상 상담</strong>
      </div>
      <div class="button">
         <button @click="handleConsultExitBtnClick">상담종료</button>
      </div>
   </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  methods: {
     handleConsultExitBtnClick() { //안됨
        window.close();
     }
  }
}
</script>