<template>
  <div class="chatContainer">
    <StatusBar />
    <div class="chatContent" ref="chatBox">
      <div class="notice">
        <p>상담이 개설되었습니다.</p>
      </div>
      <div v-for="i in chatMessage" v-bind:key="i.idx" v-bind:class="{
        notice: i.type === 'notice',
        message: i.type !== 'notice',
        left: i.type === 'left',
        right: i.type === 'right'
      }">
        <div v-if="i.type === 'left' && i.name" class="name">{{ i.name }}</div>
        <div class="bubble">
          <span v-if="i.time && i.type !== 'notice' && i.type === 'right'" class="time">{{ i.time }}</span>
          <p>{{ i.contents }}</p>
          <span v-if="i.time && i.type !== 'notice' && i.type === 'left'" class="time">{{ i.time }}</span>
        </div>
      </div>
    </div>
    <div class="chatInput">
      <input ref="chatMessage" type="text" placeholder="메시지를 입력하세요." v-on:keyup.enter="handleSendBtnClick" />
      <button @click="handleSendBtnClick">전송</button>
    </div>
  </div>
</template>

<script>
import StatusBar from './StatusBar';
import { sendMessage } from "../../commons/message";
import { eBus } from "../../commons/eventBus";
import { chatTime } from "../../commons/utils";

export default {
  components: {
    StatusBar,
  },
  name: 'Chat',
  data() {
    return {
      // left: 남, right: 나
      chatMessage: []
    }
  },
  created() {
    eBus.$on('chat', param => {
      let time = chatTime();
      let chat = this.chatMessage;
      let name = this.$store.state.studentName;
      if (
        chat.length &&
        chat[chat.length - 1].type === param.type &&
        chat[chat.length - 1].time === time) {
        chat[chat.length - 1].time = undefined;
        name = undefined;
      }

      chat.push({ type: param.type, name, contents: param.message, time: chatTime() });
    });
  },
  updated() {
    this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
  },
  methods: {
    handleSendBtnClick() {
      let message = this.$refs.chatMessage.value;
      if (!message) {
        eBus.$emit('toast', '메시지를 입력하세요.');
        return false;
      }

      this.$refs.chatMessage.value = '';
      if (!this.$store.state.isJoined) {
        eBus.$emit('toast', '상담이 시작된 뒤 채팅을 할 수 있습니다.');
        return false;
      }

      let s = this.$store.state;
      sendMessage('Chat', { roomId: s.roomInfo.roomId, userId: s.userInfo.id, message }, 'signalOp');

      let time = chatTime();
      let chat = this.chatMessage;

      if (
        chat.length &&
        chat[chat.length - 1].type === 'right' &&
        chat[chat.length - 1].time === time) {
        chat[chat.length - 1].time = undefined;
      }

      chat.push({ type: 'right', contents: message, time });
    }
  }
}
</script>
