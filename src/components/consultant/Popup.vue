<template>
  <div class="modal">
    <div class="modalContainer">
      <Confirm v-if="contentsType === 'Confirm'" v-bind:ok="okBtnClick" v-bind:cancel="cancelBtnClick" v-bind:contents="pContents" />
      <Alert v-if="contentsType === 'Alert'" v-bind:cancel="cancelBtnClick" v-bind:contents="pContents" />
      <Settings v-if="contentsType === 'Settings'" v-bind:ok="okBtnClick" v-bind:contents="pContents" v-bind:option="option" />
    </div>
  </div>
</template>

<script>
import Confirm from './popupElements/Confirm';
import Alert from './popupElements/Alert';
import Settings from './popupElements/Settings';

export default {
  props: { type: String, title: String, contents: String, ok: Function, cancel: Function, option: Object },
  components: { Confirm, Alert, Settings },
  data() {
    return {
      contentsType: this.type,
      pTitle: this.title,
      pContents: this.contents,
      okBtnClick: this.ok,
      cancelBtnClick: this.cancel,
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>
