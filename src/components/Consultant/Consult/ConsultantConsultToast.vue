<template>
  <div>
    <div class="toast">
        <p>URL이 복사되었습니다.</p>
    </div>
    <div class="wrapper">
        <div class="header">
          <div class="logo">
              <span class="img">
                <img src="@/assets/consultant/images/img_logo_sample.png" />
              </span>
              <strong>화상 상담</strong>
          </div>
          <div class="button">
              <button>상담종료</button>
          </div>
        </div>
        <div class="lnb">
          <div class="user">
              <div class="img"></div>
              <div class="info">
                <p>상담중인 학생이 없습니다.</p>
              </div>
          </div>
          <div class="menu">
              <ul>
                <li>
                    <button>화상상담</button>
                </li>
                <li>
                    <button>화면공유</button>
                </li>
                <li>
                    <button>설정</button>
                </li>
              </ul>
          </div>
        </div>
        <div class="container">
          <div class="chatContainer">
              <div class="chatHeader">
                <div class="state waiting">상담 대기중</div>
                <div class="copy">
                    <button>URL복사</button>
                    <div class="tooltip">URL을 복사하여 상담 학생에게 공유하세요. <button>close</button></div>
                </div>
              </div>
              <div class="chatContent">
                <p>상담이 개설되었습니다.</p>
              </div>
              <div class="chatInput">
                <input tyle="text" placeholder="메시지를 입력하세요.">
                <button>전송</button>
              </div>
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
  }
}
</script>

<style>
  @import '../../../assets/consultant/css/consultant.css';
</style>