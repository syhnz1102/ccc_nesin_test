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
      // if (s.streamInfo.local) s.streamInfo.local.getTracks().forEach(track => s.peerInfo['local'].addTrack(track, s.streamInfo.local));
      s.streamInfo.local.getTracks().forEach(track => s.peerInfo['local'].addTrack(track, s.streamInfo.local));

      peer.onconnectionstatechange = e => {
        console.debug(`## ${'local'} onconnectionstatechange ## `, e.currentTarget.connectionState);
        if (e.currentTarget.connectionState === 'connected') {
          startInterval();
          if (eBus._events['video']) { eBus._events['video'].pop() }
          if (eBus._events['share']) { eBus._events['share'].pop() }
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
      // sendMessage('SDP', { sdp: offer, usage: 'cam', roomId: store.state.roomInfo.roomId, isSfu: true, userId: store.state.userInfo.id });
    } catch (e) {
      console.error(e);
    }
  }

  async createAnswer(sdp, uid) {
    try {
      await store.state.peerInfo[uid].setRemoteDescription(sdp);
      const answer = await store.state.peerInfo[uid].createAnswer();
      await store.state.peerInfo[uid].setLocalDescription(answer);
      // sendMessage('SDP', { sdp: answer, usage: 'cam', roomId: store.state.roomInfo.roomId, isSfu: true, userId: store.state.userInfo.id });
    } catch (e) {
      console.error(e);
    }
  }

  async setRemoteDescription(sdp, uid) {
    await store.state.peerInfo[uid].setRemoteDescription(sdp);
  }

  // async setCandidate(candidate, uid) {
  //   await store.state.peerInfo[uid].addIceCandidate(new RTCIceCandidate(candidate));
  // }
  //
  // checkMediaDevices() {
  //   return new Promise(resolve => {
  //     navigator.mediaDevices.enumerateDevices()
  //       .then(devices => {
  //         console.debug('enumerateDevices : ', devices);
  //         let cam = devices.some(elem => elem.kind === 'videoinput');
  //         let mic = devices.some(elem => elem.kind === 'audioinput');
  //
  //         this.constraints.video = cam ? this.constraints.video : false;
  //         this.constraints.audio = mic ? this.constraints.audio : false;
  //
  //         if (cam && mic) {
  //           resolve(true);
  //         } else {
  //           eBus.$emit('popup', {
  //             on: true,
  //             type: 'Confirm',
  //             title: '통화 방 입장 오류',
  //             contents: `${!cam && !mic ? '카메라, 마이크' : !cam ? '카메라' : '마이크'} 장치가 인식되지 않습니다.\n회의실에 입장 하시겠습니까?`,
  //             ok: () => {
  //               // eBus.$emit('popup', { on: false });
  //               resolve(true);
  //             },
  //             cancel: () => {
  //               resolve(false);
  //             }
  //           })
  //         }
  //       })
  //       .catch(e => {
  //         console.error('## devices are not found: ', e);
  //         eBus.$emit('popup', {
  //           on: true,
  //           type: 'Confirm',
  //           title: '통화 방 입장 오류',
  //           contents: `카메라, 마이크 장치가 인식되지 않습니다.\n회의실에 입장 하시겠습니까?`,
  //           ok: () => {
  //             // eBus.$emit('popup', { on: false });
  //             resolve(true);
  //           },
  //           cancel: () => {
  //             resolve(false);
  //           }
  //         })
  //       });
  //   });
  // }
  //
  // setConstraint(constraints) {
  //   let s = store.state.streamInfo;
  //   if (s.local) {
  //     const tracks = s.local.getTracks();
  //     tracks.forEach(async curr => {
  //       if (curr.kind === 'video') {
  //         await curr.applyConstraints(constraints);
  //         console.debug('getConstraints ----------> ', curr.getConstraints());
  //       }
  //     });
  //   }
  // }
  //
  // destroyRoom() {
  //   sendMessage('DestroyRoom', { roomId: store.state.roomInfo.roomId });
  // }
  //
  endCall() {
    store.commit('endCall');
  }

  clear() {
    store.commit('clearAll');
  }
}

export default new WebRTC();
