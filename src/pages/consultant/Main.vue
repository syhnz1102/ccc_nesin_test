<template>
    <div class="mainContainer">
      <div class="boxContainer">
          <div class="box">
            <div class="logo">
                <span class="img">
                  <img src="@/assets/consultant/images/img_logo_sample.png" />
                </span>
            </div>
            <div class="text">
                <strong>쉽고 편리한<br /> 화상 상담 서비스</strong>
                <p>아래 버튼을 눌러 상담을 시작해보세요.</p>
            </div>
            <div class="button">
                <button @click="call">상담 시작하기</button>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import { eBus } from '../../commons/eventBus.js'

export default {
  data() {
    return {
    }
  },
  methods: {
    call() {
      let consultWindow = window.open( 'room', "", "resizable=1, height=522, width=492, toolbar=0" );
    }
  }
}
</script>

<style>
  @import '../../assets/consultant/css/consultant.css';
</style>