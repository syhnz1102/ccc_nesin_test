<template>
    <div class="wrapper">
      <Toast v-if="toast" />
      <Header />
      <NavBar />
      <Container />
    </div>
</template>

<script>
import Toast from '@/components/consultant/Consult/ConsultantConsultToast';
import Header from '@/components/consultant/Header';
import NavBar from '@/components/consultant/NavBar';
import Container from '@/components/consultant/Container';

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
  },
  destroyed() {
    if (this.$store.state.socket) this.$store.state.socket.close();
  }
}
</script>

<style>
  @import '../../assets/consultant/css/consultant.css';
</style>
