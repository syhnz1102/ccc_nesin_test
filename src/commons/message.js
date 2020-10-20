import store from '../store';
import router from '../router';
import webRTC from './webrtc';
import { eBus } from "./eventBus";
import screenShare from "./screenshare";

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
          eBus.$emit('chat', {
            type: 'notice',
            message: '상담이 시작되었습니다.'
          })
        } else {
          // 상담사

        }

        // console.log('store : ', store.state)
      }
      break;

    case 'StartSession':
      if (resp.useMediaSvr && resp.useMediaSvr === 'N') {
        // 내신닷컴에서는 1:1만 허용
        sendMessage('StartSession', { code: '200' });
        if (resp.members) store.commit('setRoomInfo', { members: resp.members, count: Object.keys(resp.members).length, type: resp.useMediaSvr === 'Y' ? 'multi' : 'p2p', host: resp.host });
        store.commit('setJoinedStatus', true);
        if (window.location.href.indexOf('student') <= -1) {
          sendMessage('ChangeName', { userId: store.state.userInfo.id, roomId: store.state.roomInfo.roomId, name: store.state.studentName }, 'signalOp');
          eBus.$emit('entranceStatusBar', {
            entrance: true,
            name: store.state.studentName
          })

          eBus.$emit('entranceNavbar', {
            entrance: true,
            name: store.state.studentName
          })

          eBus.$emit('chat', {
            type: 'notice',
            message: `${store.state.studentName}님이 입장하였습니다.`
          })
        }
      }

      // 내신닷컴에서는 StartSession에서 SDP를 전송하지 않음.
      break;

    case 'SDP':
      if (resp.code === '200' || (resp.useMediaSvr && resp.useMediaSvr === 'Y')) return;
      if (resp.usage === 'cam') {
        if (resp.sdp.type === 'offer') {
          if (!store.state.endCallForced) {
            sendMessage('SDP', { code: '200' });
            // 학생
            eBus.$emit('video', { type: 'start' });
            eBus.$emit('showVideo', { on: true, share: store.state.isSharing });

            setTimeout(async () => {
              await webRTC.createPeer();
              await webRTC.createAnswer(resp.sdp, 'local');
            }, 500);
            // console.log(store.state)

            eBus.$emit('chat', {
              type: 'notice',
              message: `${store.state.isSharing ? '화면 공유가' : '화상 상담이'} 시작되었습니다.`
            });
          } else if (store.state.endCallForced) {
            eBus.$emit('showVideo', { on: false, share: false });

            eBus.$emit('chat', {
              type: 'notice',
              message: `화상 상담이 시작되었습니다.`
            });

            setTimeout(async () => {
              eBus.$emit('chat', {
                type: 'notice',
                message: `화상 상담이 종료되었습니다.`
              });
            }, 200);

            store.commit('setEndCallForcedStatus', false );
            webRTC.endCall();
          }
        } else if (resp.sdp.type === 'answer') {
          // 상담사
          await webRTC.setRemoteDescription(resp.sdp, 'local');
          sendMessage('SDP', { code: '200' });
          // console.log(store.state)
          eBus.$emit('consultInfo', { name: store.state.studentName });
        }
      } else if (resp.usage === 'screen') {
        if (resp.sdp.type === 'offer') {
          if (!store.state.endCallForced) {
            await screenShare.createPeer('screen');
            await webRTC.createAnswer(resp.sdp, 'screen');
            sendMessage('SDP', { code: '200' });
            eBus.$emit('showVideo', { on: true, share: true });
          } else if (store.state.endCallForced) {
            eBus.$emit('showVideo', { on: false, share: false });

            eBus.$emit('chat', {
              type: 'notice',
              message: `화면 공유가 시작되었습니다.`
            });

            setTimeout(async () => {
              eBus.$emit('chat', {
                type: 'notice',
                message: `화면 공유가 종료되었습니다.`
              });
            }, 200);

            store.commit('setEndCallForcedStatus', false );
            webRTC.endCall();
          }
        } else if (resp.sdp.type === 'answer') {
          await webRTC.setRemoteDescription(resp.sdp, 'screen');
          sendMessage('SDP', { code: '200' });
          eBus.$emit('share', { on: true })
          eBus.$emit('shareVideo', { on: true })
        }
      }
      break;

    case 'SessionReserve':
      if (resp.code === '200') {
        let stream = await screenShare.createShareStream();
        await screenShare.createPeer('screen');
        await webRTC.createOffer('screen');
      } else {
        eBus.$emit('popup', {
          on: true,
          type: 'Alert',
          title: '화면 공유',
          contents: '지금은 화면 공유를 진행할 수 없습니다.'
        })
      }
      break;

    case 'ScreenShareConferenceEndSvr':
      eBus.$emit('share', { on: false })
      eBus.$emit('shareVideo', { on: false })
      break;

    case 'Presence':
      if (resp.action === 'exit') {
        if (window.location.href.indexOf('student') > -1) {
          // 학생일 경우 상담사가 나가면 자신도 종료 후 메인화면으로 이동
          eBus.$emit('popup', {
            on: true,
            type: 'Alert',
            title: '상담 종료',
            contents: '상담이 종료 되었습니다.',
            cancel: () => {
              if (store.state.socket) {
                sendMessage('ExitRoom', { roomId: window.location.href.split('/room/')[1] });
                webRTC.clear();
                // store.state.socket.close();
              }
              router.push({ path: `/student` });
              // console.log('store : ', store.state)
            }
          })
        } else if (window.location.href.indexOf('student') <= -1) {
          // 상담사인 경우 방은 유지, notice만 줌
          // 플러스로 비디오 닫고 인터벌도 끊어주기 (상담사)
          webRTC.endCall();

          eBus.$emit('chat', {
            type: 'notice',
            message: `${store.state.studentName}님이 퇴장하였습니다.`
          })

          // store.commit('setStudentName', '');
          store.commit('setJoinedStatus', false);
          store.commit('setCallingStatus', false);

          eBus.$emit('entranceStatusBar', {
            entrance: false,
            name: ''
          })

          eBus.$emit('entranceNavbar', {
            entrance: false,
            name: ''
          })

          eBus.$emit('showVideo', { on: false });

          eBus.$emit('menu', {
            on: false,
            menu: 'call'
          });

          eBus.$emit('menu', {
            on: false,
            menu: 'share'
          });
        }
      } else if (resp.action === 'endCall') {
        if (window.location.href.indexOf('student') > -1) {
          // 학생일 경우
          if (store.state.isCalling) {
            eBus.$emit('showVideo', { on: false, share: store.state.isSharing })
            eBus.$emit('progressBar', { on: false });

            eBus.$emit('chat', {
              type: 'notice',
              message: `${store.state.isSharing ? '화면 공유가' : '화상 상담이'} 종료되었습니다.`
            });
          } else if (!store.state.isCalling) {
            eBus.$emit('showVideo', { on: false, share: false })
            eBus.$emit('progressBar', { on: false });

            store.commit('setEndCallForcedStatus', true );
          }
          webRTC.endCall();
        } else if (window.location.href.indexOf('student') <= -1) {
          // 상담사인 경우
          window.resizeTo( 514, 606 );
          eBus.$emit('showVideo', { on: false });

          eBus.$emit('menu', {
            on: false,
            menu: 'call'
          });

          eBus.$emit('menu', {
            on: false,
            menu: 'share'
          });

          eBus.$emit('chat', {
            type: 'notice',
            message: `${store.state.isSharing ? '화면 공유가' : '화상 상담이'} 종료되었습니다.`
          });

          sendMessage('EndCall', { userId: store.state.userInfo.id, roomId: store.state.roomInfo.roomId });
          webRTC.endCall();
        }
      } else if (resp.action === 'join') {
        if (resp.members) store.commit('setRoomInfo', { members: resp.members, count: Object.keys(resp.members).length });
      } else if (resp.action === 'kick') {
        eBus.$emit('popup', {
          on: true,
          type: 'Alert',
          title: '상담 종료',
          contents: '상담이 종료 되었습니다.',
          cancel: () => {
            router.push({ path: `/student` });
          }
        })

        if (store.state.socket) {
          sendMessage('ExitRoom', { roomId: window.location.href.split('/room/')[1] });
          webRTC.clear();
        }
      }
      break;

    case 'ChangeName':
      store.commit('setStudentName', resp.name);
      break;

    case 'SetAudio':
      eBus.$emit('video', {
        type: 'set',
        id: 'remote',
        audio: resp.status
      })
      break;

    case 'SetVideo':
      eBus.$emit('video', {
        type: 'set',
        id: 'remote',
        video: resp.status
      })
    break;

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
  obj['cpCode'] = 'KP-NESIN-01';
  obj['authKey'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcENvZGUiOiJLUC1ORVNJTi0wMSIsImNwTmFtZSI6Ik5FU0lORE9UQ09NIiwiY2F0ZWdvcnkiOiJjb25zdWx0aW5nIiwiYWxsb3dNYXhVc2VyIjoxMDAwMCwiYWxsb3dTdGFydERhdGUiOiIyMDIwLTEwLTA1IiwiYWxsb3dFbmREYXRlIjoiMjAyMS0xMC0wNCIsImlhdCI6MTYwMzE1ODU1NX0.Kd9Dr4WQ1SASYwI4UqBP_D63VTlXWFBo7ysY_aLXLJ0';
  Object.assign(data, obj);
  console.debug(`[ ${op} ] Web -> Signal `, data);
  store.state.socket.emit('knowledgetalk', data);
}
