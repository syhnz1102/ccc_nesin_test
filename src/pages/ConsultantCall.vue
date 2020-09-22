<template>
    <div class="wrapper">
      <Header/>
      <NavBar/>
      <Container/>
    </div>
</template>


<script>

import Header from '../components/consultant/shared/Header'
import NavBar from '../components/consultant/shared/NavBar'
import Container from '../components/consultant/shared/Container'

export default {
  components: {
    NavBar,
    Header,
    Container
  },
  name: 'hello',
  data () {
    return {
    }
  }
}
</script>

<style>
  @import '../assets/consultant/css/consultant.css';
</style>