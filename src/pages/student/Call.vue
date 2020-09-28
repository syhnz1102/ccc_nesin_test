<template>
   <div class="wrapper">
      <PopUp
         v-if="popUp.on"
         v-bind:contents="popUp.contents"
      />
      <Header />
      <Container />
   </div>
</template>

<script>
import PopUp from '@/components/student/PopUp/StudentPopUp'
import Header from '@/components/student/shared/Header'
import Container from '@/components/student/shared/Container'
import { eBus } from '../../commons/eventBus.js'

export default {
   components: {
      Header,
      Container,
      PopUp
   },
   created() {
      eBus.$on('popUp', param => {//여기서 popUp으로의 컨텐츠전달은 prop으로
         this.popUp.on = param.on;
         this.popUp.contents = param.contents;
      });
   },
   data() {
      return {
         popUp: {
            on: false,
            contents: '',
         }
      }
   }
}
</script>

<style>
  @import '../../assets/student/css/student.css';
</style>