<template>
  <div>
  <h1>- 임시 페이지 (내신닷컴 홈페이지에 삽입될 내용) -</h1>

  <br />
  <br />

  <button style="background-color: #999999; width: 400px; height: 100px; font-size: 33px" @click="btnHandler">상담 시작하기</button>

  <br />
  <br />
  <br />

  <h3>본 페이지는 내신닷컴 홈페이지 내에 삽입 될 버튼을 대신하여 만들어졌습니다.</h3>
  <h3>내신닷컴 개발 담당께서는 아래 코드를 참고하시어 버튼 클릭 시 새 창으로 띄워주세요.</h3>
  <p>window.open(url + parameter, "", "resizable=1, height=520, width=500, toolbar=0")</p>
  <p>parameter는 &userName={studentName}&roomId={roomId}입니다.</p>
  </div>
</template>

<script>
export default {
  name: "Intro",
  methods: {
    btnHandler: () => {
      // window.open('main?userName=김내신(학생)&roomId=13232124', '', 'resizable=1, height=520, width=500, toolbar=0');
      window.open('main?userName=김내신(학생)&roomId=12341234', '', 'resizable=1, height=520, width=500, toolbar=0');
    }
  }
}
</script>
