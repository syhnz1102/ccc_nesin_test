<template>
   <div class="modal">
      <div class="modalContainer">
         <div class="modalContent">
            <div class="title">디바이스 설정</div>
            <div class="setting">
               <ul class="select">
                  <li>
                     <label>Camera</label>
                     <select required>
                        <option value="">HP HD Camera (05c8:03b1)</option>
                        <option value="">Camera1</option>
                        <option value="">Camera2</option>
                     </select>
                  </li>
                  <li class="mic">
                     <label>Microphone</label>
                     <select required>
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
                     <select required>
                        <option value="">기본값 - 헤드폰(Conexant ISST Audio)</option>
                        <option value="">Speaker1</option>
                        <option value="">Speaker2</option>
                     </select>
                     <button>테스트</button>
                     <!-- <button class="on">테스트</button> -->
                  </li>
               </ul>
            </div>
            <p>화상 상담 시작 전 카메라와 마이크가 정상 동작하는지 확인하세요.</p>
            <div class="button">
               <button class="border">새로고침</button>
               <button class="submit" @click="closeDeviceStart">시작</button>
            </div>
         </div>
         <div class="modalCheck">
            <div class="checkbox">
               <input id="checkbox" type="checkbox">
               <label for="checkbox">다시 보지 않기</label>
            </div>
         </div>
      </div>
   </div>
</template>

<script>

import { eBus } from '../../../commons/eventBus.js'

export default {
  name: 'hello',
  data () {
    return {
    }
  },
  methods: {
     closeDeviceStart(){
        eBus.$emit('closeDeviceStart', false);
     }
  }
}
</script>

<style>
  @import '../../../assets/consultant/css/consultant.css';
</style>