<template>
      <div class="modal">
   <div class="modalContainer">
      <div class="modalContent">
         <div class="title">디바이스 설정</div>
         <div class="setting">
            <ul class="select">
               <li>
                  <label>Camera</label>
                  <select required disabled>
                     <option value="">HP HD Camera (05c8:03b1)</option>
                     <option value="">Camera1</option>
                     <option value="">Camera2</option>
                  </select>
               </li>
               <li class="mic">
                  <label>Microphone</label>
                  <select required disabled>
                     <option value="">기본값 - 외장 마이크(Conexant ISST Audio)</option>
                     <option value="">Microphone1</option>
                     <option value="">Microphone2</option>
                  </select>
                  <div class="volume">
                     <div class="percent" style="height:50%">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                     </div>
                  </div>
                  <!--
                  <div class="volume none">
                     <div class="percent">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                     </div>
                  </div>
                  -->
               </li>
               <li class="speaker">
                  <label>Speaker</label>
                  <select required disabled>
                     <option value="">기본값 - 헤드폰(Conexant ISST Audio)</option>
                     <option value="">Speaker1</option>
                     <option value="">Speaker2</option>
                  </select>
                  <button>테스트</button>
                  <!-- <button class="on">테스트</button> -->
               </li>
            </ul>
         </div>
         <p>화상 상담중에는 디바이스 설정을 변경할 수 없습니다.</p>
         <div class="button">
            <button class="submit" @click="handleCloseDeviceOnPlayBtnClick">확인</button>
         </div>
      </div>
   </div>
</div>
</template>

<script>
import { eBus } from '../../../commons/eventBus'
export default {
  name: 'hello',
  data () {
    return {
    }
  },
  methods: {
     handleCloseDeviceOnPlayBtnClick() {
        eBus.$emit('closeDeviceOnPlay', false);
     }
  }
}
</script>

<style>
  @import '../../../assets/consultant/css/consultant.css';
</style>