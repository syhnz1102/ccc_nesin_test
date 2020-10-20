import store from '../store';
import { eBus } from './eventBus';
import { sendMessage } from './message';
import { startInterval } from "./utils";

class WebRTC {
  constraints = { video: true, audio: true };

  constructor() {

  }

  createVideoStream() {
    return new Promise(async (resolve, reject) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(this.constraints);
        store.commit('setStreamInfo', { local: stream });
        resolve(stream);
      } catch (err) {
        alert('영상 장치를 불러오는데 실패 했습니다.');
      }
    })
  }

  createPeer() {
    return new Promise(async (resolve, reject) => {
      const peer = new RTCPeerConnection({ iceServers: [{ urls: 'turn:turn.knowledgetalk.co.kr:46000', username: 'kpoint', credential: 'kpoint01' }, { urls : 'stun:stun.knowledgetalk.co.kr:46000' }] });

      // peer.onaddstream = ({ stream }) => {
      peer.ontrack = ({ streams }) => {
        console.debug(`onaddstream :`, streams[0]);

        // ontrack 중복 제거
        if (Object.keys(store.state.streamInfo).some(elem => elem === 'remote')) {
          return false;
        }

        // 남의 스트림이 오면 video에 꽂아 넣기!
        let streamObj = {};
        streamObj['remote'] = streams[0];
        store.commit('setStreamInfo', streamObj);

        eBus.$emit('video', {
          type: 'add',
          stream: streams[0],
        });
      }

      let peerObj = {};
      peerObj['local'] = peer;
      store.commit('setPeerInfo', peerObj);

      let s = store.state;
      s.streamInfo.local.getTracks().forEach(track => s.peerInfo['local'].addTrack(track, s.streamInfo.local));

      peer.onconnectionstatechange = e => {
        console.debug(`## ${'local'} onconnectionstatechange ## `, e.currentTarget.connectionState);
        if (e.currentTarget.connectionState === 'connected') {
          sendMessage('StartCall', { userId: s.userInfo.id, roomId: s.roomInfo.roomId });
          startInterval();
        } else if (e.currentTarget.connectionState === 'failed') {
          let s = store.state;
          if (window.location.href.indexOf('student') <= -1) window.resizeTo( 514, 606 );
          eBus.$emit('showVideo', { on: false });

          if (store.state.isSharing) {
            eBus.$emit('menu', {
              on: false,
              menu: 'share'
            });

            eBus.$emit('chat', {
              type: 'notice',
              message: '화면 공유가 종료되었습니다.'
            });

            sendMessage('SessionReserveEnd', { userId: s.userInfo.id, roomId: s.roomInfo.roomId })
            sendMessage('ScreenShareConferenceEnd', { userId: s.userInfo.id, roomId: s.roomInfo.roomId, useMediaSvr: 'N' })
            this.$store.commit('setSharingStatus', false);
          } else {
            eBus.$emit('menu', {
              on: false,
              menu: 'call'
            });

            eBus.$emit('chat', {
              type: 'notice',
              message: '화상 상담이 종료되었습니다.'
            });
          }

          // sendMessage('EndCall', { userId: s.userInfo.id, roomId: s.roomInfo.roomId });
          this.endCall();
        }
      };

      let peerCount = 0;
      peer.onicecandidate = e => {
        if (peerCount <= 0) {
          setTimeout(() => {
            sendMessage('SDP', { sdp: peer.localDescription, usage: 'cam', roomId: store.state.roomInfo.roomId, userId: store.state.userInfo.id });
          }, 1500);
        }
        peerCount++;
      };
      resolve();
    });
  }

  async createOffer(uid) {
    try {
      const offer = await store.state.peerInfo[uid].createOffer(); // Promise
      await store.state.peerInfo[uid].setLocalDescription(offer); // Promise
    } catch (e) {
      console.error(e);
    }
  }

  async createAnswer(sdp, uid) {
    try {
      await store.state.peerInfo[uid].setRemoteDescription(sdp);
      const answer = await store.state.peerInfo[uid].createAnswer();
      await store.state.peerInfo[uid].setLocalDescription(answer);
    } catch (e) {
      console.error(e);
    }
  }

  async setRemoteDescription(sdp, uid) {
    await store.state.peerInfo[uid].setRemoteDescription(sdp);
  }

  endCall() {
    eBus.$emit('init', {});
    store.commit('endCall');
  }

  clear() {
    eBus.$emit('init', {});
    store.commit('clearAll');
  }
}

export default new WebRTC();
