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
                      <!--
                          <button class="on">테스트</button>
                      -->
                    </li>
                </ul>
              </div>
              <div class="button">
                <button class="submit" @click="handleCloseDeviceStandardBtnClick">확인</button>
                <button class="cancel" @click="handleCloseDeviceStandardBtnClick">취소</button>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import { eBus } from '../../../commons/eventBus'

export default {
  data() {
    return {
    }
  },
  methods: {
    handleCloseDeviceStandardBtnClick() {
      eBus.$emit('closeDeviceStandard', false);
    }
  }
}
</script>

