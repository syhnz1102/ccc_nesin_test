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
export default {
  name: 'hello',
  data () {
    return {
    }
  },
  methods: {
    call : function() {
      let type02 = window.open('room', "", "resizable=1, height=524, width=494");//f12보고 다시맞춘값
      // let type02 = window.open('room', "", "resizable=1, height=520, width=500");
    }
  }
}
</script>

<style>
  @import '../../assets/consultant/css/consultant.css';
</style>