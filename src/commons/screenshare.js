import store from '../store';
import { sendMessage } from './message';
import { eBus } from "./eventBus";

class ScreenShare {
  constructor() {

  }

  createShareStream() {
    return new Promise(async (resolve, reject) => {
      // 200703 ivypark, v1.0.2. getDisplayMedia 데이터 없는 경우 SessionReserve 해제되도록 변경
      // 200617 ivypark, v0.9.2. 에러 무시. Stream 안나온 경우 에러팝업 뜨지 않도록 변경
      navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
        .then(stream => {
          if (typeof stream === 'object' && stream) {
            store.commit('setStreamInfo', { screen: stream });
            resolve(stream);
          }
        })
        .catch(e => {
          sendMessage('SessionReserveEnd', { userId: store.state.userInfo.id, roomId: store.state.roomInfo.roomId })
        })
    })
  }

  createPeer(uid) {
    return new Promise(async (resolve, reject) => {
      const peer = new RTCPeerConnection({ iceServers: [{ urls: 'turn:turn.knowledgetalk.co.kr:46000', username: 'kpoint', credential: 'kpoint01' }, { urls : 'stun:stun.knowledgetalk.co.kr:46000' }] });
      // 200825 ivypark, legacy codes
      // peer.onaddstream = ({ stream }) => {
      peer.ontrack = ({ streams }) => {
        console.debug(`onaddstream :`, streams[0]);
        let streamObj = {};
        streamObj[uid] = streams[0];
        store.commit('setStreamInfo', streamObj);

        eBus.$emit('share', {
          on: true,
          stream: streams[0]
        });
        eBus.$emit('shareVideo', { on: true })
      }

      peer.onconnectionstatechange = e => {
        console.debug(`## ${uid} onconnectionstatechange ## `, e.currentTarget.connectionState);
      };
      peer.onicegatheringstatechange = e => {
        // 200703 ivypark, v1.0.2. gatheringstate -> candidate null 일때 SDP 전송으로 변경
        if (peer.iceGatheringState === 'complete') {

        }
      }
      let peerCount = 0;
      peer.onicecandidate = e => {
        if (peerCount <= 0) {
          setTimeout(() => {
            sendMessage('SDP', {
              sdp: peer.localDescription,
              usage: 'screen',
              roomId: store.state.roomInfo.roomId,
              // isSfu: true,
              userId: store.state.userInfo.id,
              useMediaSvr: 'N',
            });
          }, 1500);
        }
        peerCount++;
      };

      let peerObj = {};
      peerObj[uid] = peer;
      store.commit('setPeerInfo', peerObj);

      let s = store.state;
      if (s.streamInfo[uid]) {
        s.streamInfo[uid].getTracks().forEach(track => {
          s.peerInfo['screen'].addTrack(track, s.streamInfo[uid]);
          track.onended = () => {
            eBus.$emit('share', {
              type: 'remove',
              isSharer: true
            })
            track.stop();
          }
        });
      }

      resolve();
    });
  }

}

export default new ScreenShare();
