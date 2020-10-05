import store from '../store';
import router from '../router';
import webRTC from './webrtc';
// import mobile from './mobile';
import { eBus } from "./eventBus";
// import screenShare from "./screenshare";
// import utils from './utils';
// import config from '../config';

export async function onMessage(resp) {
  console.debug(`[ ${resp.eventOp} ] Signal -> Web `, resp);

  switch (resp.eventOp || resp.signalOp) {
    case 'CreateRoom':
      if (resp.code === '200') {
        store.commit('setRoomInfo', { roomId: resp.roomId });
        router.push({ path: `/room/${resp.roomId}` });
        sendMessage('RoomJoin', { roomId: window.location.href.split('/room/')[1] });
      }
      break;
    case 'RoomJoin':
      if (resp.code === '400') {
        console.warn('rooms are expired. go to main');
        alert('상담 방이 만료되었습니다. 메인으로 이동합니다.');
        router.push({ path: `${window.location.href.indexOf('student') > -1 ? '/student' : '/main'}` });
        return false;
      }

      if (resp.members) {
        if (Object.keys(resp.members).length > 2) {
          alert('최대 인원이 초과되었습니다. 메인으로 이동합니다.');
          return router.push({ path: `${window.location.href.indexOf('student') > -1 ? '/student' : '/main'}` });
        }
        store.commit('setUserInfo', { id: resp.userId, name: '상담사' });
        store.commit('setRoomInfo', { members: resp.members, roomId: resp.roomId, count: Object.keys(resp.members).length, type: Object.keys(resp.members).length > 2 ? 'multi' : 'p2p' });

        // TODO: 학생, 상담사 구분 방법 필요 (parameter)
        if (window.location.href.indexOf('student') > -1) {
          // 학생
          if (Object.keys(resp.members).length === 1) {
            alert('상담 방이 만료되었습니다. 메인으로 이동합니다.');
            return router.push({ path: `${window.location.href.indexOf('student') > -1 ? '/student' : '/main'}` });
          }

          store.commit('setJoinedStatus', true);
          sendMessage('ChangeName', { userId: store.state.userInfo.id, roomId: store.state.roomInfo.roomId, name: store.state.studentName }, 'signalOp');
          eBus.$emit('chat', {
            type: 'notice',
            message: '상담이 시작되었습니다.'
          })
        } else {
          // 상담사

        }

        console.log('store : ', store.state)
      }
      break;

    case 'StartSession':
      sendMessage('StartSession', { code: '200' });
      if (resp.members) store.commit('setRoomInfo', { members: resp.members, count: Object.keys(resp.members).length, type: resp.useMediaSvr === 'Y' ? 'multi' : 'p2p', host: resp.host });
      store.commit('setJoinedStatus', true);

      // 내신닷컴에서는 StartSession에서 SDP를 전송하지 않음.

      break;

    case 'SDP':
      if (resp.code === '200') return;
      if (resp.usage === 'cam') {
        if (resp.sdp.type === 'offer') {
          sendMessage('SDP', { code: '200' });
          // 학생
          eBus.$emit('showVideo', { on: true });
          setTimeout(async () => {
            await webRTC.createPeer();
            await webRTC.createAnswer(resp.sdp, 'local');
          }, 1000);
          console.log(store.state)
        } else if (resp.sdp.type === 'answer') {
          // 상담사
          await webRTC.setRemoteDescription(resp.sdp, 'local');
          sendMessage('SDP', { code: '200' });
          console.log(store.state)
          eBus.$emit('consultInfo', { name: store.state.studentName });
        }
      } else if (resp.usage === 'screen') {
        // if (resp.sdp.type === 'offer') {
        //   await screenShare.createPeer('screen', resp.useMediaSvr === 'Y', resp.pluginId);
        //   await webRTC.createAnswer(resp.sdp, 'screen');
        //   sendMessage('SDP', { code: '200' });
        // } else if (resp.sdp.type === 'answer') {
        //   await webRTC.setRemoteDescription(resp.sdp, 'screen');
        //   sendMessage('SDP', { code: '200' });
        // }
      }
      break;
    //
    // case 'Candidate':
    //   if (resp.usage === 'cam') {
    //     if (resp.candidate) await webRTC.setCandidate(resp.candidate, resp.useMediaSvr === 'N' ? 'local' : resp.userId);
    //     sendMessage('Candidate', { code: '200' });
    //   }
    //   break;
    //
    // case 'ReceiveFeed':
    //   // sendMessage('ReceiveFeed', { code: '200' });
    //
    //   // TODO: 200728 ivypark, functionalization
    //   resp.feeds.forEach(curr => {
    //     sendMessage('SendFeed', { roomId: resp.roomId, feedId: curr.id, display: curr.display });
    //   })
    //   break;
    //
    // case 'SendFeed':
    //   // TODO.
    //   break;
    //
    // case 'SessionReserve':
    //   if (resp.code === '200') {
    //     let stream = await screenShare.createShareStream();
    //     await screenShare.createPeer('screen', store.state.roomInfo.count > 2);
    //     await webRTC.createOffer('screen');
    //     eBus.$emit('share', {
    //       type: 'add',
    //       id: 'screen',
    //       isLocal: true,
    //       stream,
    //       count: store.state.roomInfo.count
    //     })
    //   } else {
    //     eBus.$emit('popup', {
    //       on: true,
    //       type: 'Alert',
    //       title: '화면 공유',
    //       contents: '지금은 화면 공유를 진행할 수 없습니다.'
    //     })
    //   }
    //   break;
    //
    // case 'ScreenShareConferenceEndSvr':
    //   eBus.$emit('share', {
    //     type: 'remove'
    //   })
    //   break;
    //
    case 'Presence':
      if (resp.action === 'exit' && window.location.href.indexOf('student') > -1) {
        // 학생일 경우 상담사가 나가면 자신도 종료 후 메인화면으로 이동
        if (store.state.socket) {
          // webRTC.clear();

          alert('상담이 종료 되었습니다.');
          store.state.socket.close();
          sendMessage('ExitRoom', { roomId: window.location.href.split('/room/')[1] });
        }

        router.push({ path: `/student` });
        console.log('store : ', store.state)
      } else if (resp.action === 'exit' && window.location.href.indexOf('student') <= -1) {
        // 상담사인 경우 방은 유지, notice만 줌
        eBus.$emit('chat', {
          type: 'notice',
          message: `${store.state.studentName}님이 퇴장하였습니다.`
        })

        store.commit('setStudentName', '');
        eBus.$emit('entrance', {
          entrance: false,
          name: ''
        })
      } else if (resp.action === 'join') {
        if (resp.members) store.commit('setRoomInfo', { members: resp.members, count: Object.keys(resp.members).length });
      }
      break;

    case 'ChangeName':
      store.commit('setStudentName', resp.name);
      eBus.$emit('entrance', {
        entrance: true,
        name: resp.name
      })

      eBus.$emit('chat', {
        type: 'notice',
        message: `${resp.name}님이 입장하였습니다.`
      })
      break;
    //
    // case 'SetAudio':
    //   eBus.$emit('video', {
    //     type: 'set',
    //     id: store.state.roomInfo.type === 'p2p' ? 'remote' : resp.userId,
    //     isOffMic: resp.status
    //   })
    //   break;
    //
    // case 'SetVideo':
    //   eBus.$emit('video', {
    //     type: 'set',
    //     id: store.state.roomInfo.type === 'p2p' ? 'remote' : resp.userId,
    //     isOffVideo: resp.status
    //   })
    //   break;
    //
    case 'Chat':
      eBus.$emit('chat', {
        type: 'left',
        id: resp.userId,
        message: resp.message
      })
      break;
  }
}

export function sendMessage(op, data = {}, type = 'eventOp') {
  let obj = {};
  obj[type] = op;
  obj['cpCode'] = 'KP-20200101-01';
  obj['authKey'] = 'KnowledgePoint';
  Object.assign(data, obj);
  console.debug(`[ ${op} ] Web -> Signal `, data);
  store.state.socket.emit('knowledgetalk', data);
}
