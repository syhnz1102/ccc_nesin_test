import io from 'socket.io-client';
import store from '../store';
import { onMessage, sendMessage } from './message';

class Session {
  socket = null;
  timeout = null;
  interval = null;

  constructor() {

  }

  connect() {
    return new Promise(resolve => {
      console.debug('----------------- Opened Session -----------------')
      // this.socket = io.connect('https://localhost:7103/SignalServer', { reconnect: true, 'transports': ['websocket'] })
      this.socket = io.connect('https://dev.knowledgetalk.co.kr:7103/SignalServer', { reconnect: true, 'transports': ['websocket'] })
      this.socket.on('knowledgetalk', onMessage);
      store.commit('setSocketIo', this.socket);

      this.socket.on('connect', () => {
        if (!this.interval) {
          sendMessage('KeepAlive', {});
          this.interval = setInterval(this.handleIntervalProc, 55 * 1000);
        }

        resolve(true);
      })

      this.socket.on('disconnect', () => {
        // webRTC.clear();
        // eBus.$emit('popup', {
        //   on: true,
        //   type: 'Alert',
        //   title: '회의 참여',
        //   contents: '서버와의 연결이 원활하지 않아 초기화면으로 이동합니다.',
        //   cancel: () => {
        //     window.location.href = utils.getPrivateUrl();
        //   }
        // })
        // resolve(false);
      })

      this.socket.on('connect_error', () => {
        // webRTC.clear();
        // eBus.$emit('video', { type: 'remove' });
        // eBus.$emit('popup', {
        //   on: true,
        //   type: 'Alert',
        //   title: '회의 참여',
        //   contents: '서버와의 연결이 원활하지 않아 초기화면으로 이동합니다.',
        //   cancel: () => {
        //     window.location.href = utils.getPrivateUrl();
        //   }
        // })
        // resolve(false);
      })
    })
  }

  close() {
    if (this.socket) this.socket.close();
    store.commit('clearAll');
    this.stopInterval();
  }

  handleIntervalProc() {

  }

  stopInterval() {
    if (this.interval) clearInterval(this.interval);
  }
}

export default Session;
