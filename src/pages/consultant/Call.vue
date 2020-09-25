<template>
    <div class="wrapper"> 
      <Toast v-if="toast" />
      <Header />
      <NavBar />
      <Container />
    </div>
</template>

<script>
import Toast from '@/components/consultant/Consult/ConsultantConsultToast'
import Header from '@/components/consultant/shared/Header'
import NavBar from '@/components/consultant/shared/NavBar'
import Container from '@/components/consultant/shared/Container'

export default {
  components: {
    Toast,
    NavBar,
    Header,
    Container,
  },
  data() {
    return {
      toast: false,
    }
  }
}
</script>

<style>
  @import '../../assets/consultant/css/consultant.css';
</style>