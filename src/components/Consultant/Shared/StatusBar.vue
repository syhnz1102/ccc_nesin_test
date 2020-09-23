<template>
   <div class="chatHeader">
      <div v-if="!entrance" class="state waiting">상담 대기중</div>
      <!-- [i] 상담 진행 시 -->
      <div v-if="entrance" class="state start">상담 진행중</div>
      <div class="copy">
         <button>URL복사</button>
         <div class="tooltip">URL을 복사하여 상담 학생에게 공유하세요. <button>close</button></div>
      </div>
   </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
       entrance:false,
    }
  }
}
</script>

<style>
  @import '../../../assets/consultant/css/consultant.css';
</style>