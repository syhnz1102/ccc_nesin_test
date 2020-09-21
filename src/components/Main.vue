<template>
  <div class="hello">
    <div class="wrapper">
      <div class="mainContainer">
         <div class="boxContainer">
            <div class="box">
               <div class="logo">
                  <span class="img">
                     <img src="../assets/images/img_logo_sample.png" />
                  </span>
               </div>
               <div class="text">
                  <strong>쉽고 편리한<br /> 화상 상담 서비스</strong>
                  <p>아래 버튼을 눌러 상담을 시작해보세요.</p>
               </div>
               <div class="button">
                  <button @click="toType01">상담 시작하기 (type01)</button>
                  <br />
                  <br />
                  <button @click="toType02">상담 시작하기 (type02)</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    }
  },
  methods : {
    toType01 : function() {
      let type01 = window.open('type1', "", "resizable=1, height=520, width=500");
      //url, name, specs, replace
      // this.$router.push({path: 'Type01'});
    },

    toType02 : function() {
      let type02 = window.open('type2', "", "resizable=1, height=520, width=840");
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
