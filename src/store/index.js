import Vue from 'vue';
import Vuex from 'vuex';

import { runningTime } from "../commons/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    socket: null,
    peerInfo: {},
    streamInfo: {},
    roomInfo: {},
    userInfo: {},
    isJoined: false,
    isCalling: false,
    studentName: '',
    runningTime: '00:00',
    counter: 0,
    logoURL: ''
  },
  mutations: {
    setSocketIo(state, socket) {
      state.socket = socket;
    },
    setPeerInfo(state, peer) {
      Object.assign(state.peerInfo, peer);
    },
    removePeerInfo(state, name) {
      if (state.peerInfo[name]) {
        state.peerInfo[name].close();
        delete state.peerInfo[name];
      }
    },
    setStreamInfo(state, info) {
      Object.assign(state.streamInfo, info);
    },
    removeStreamInfo(state, name) {
      if (state.streamInfo[name]) {
        state.streamInfo[name].getTracks().forEach(track => {
          track.stop();
        });

        delete state.streamInfo[name];
      }
    },
    setRoomInfo(state, info) {
      Object.assign(state.roomInfo, info);
    },
    setUserInfo(state, info) {
      Object.assign(state.userInfo, info);
    },
    clearAll(state) {
      if (Object.keys(state.streamInfo).length > 0) {
        for (let c in state.streamInfo) {
          state.streamInfo[c].getTracks().forEach(track => {
            track.stop();
          });
        }
        state.streamInfo = {};
      }

      for (let c in state.peerInfo) {
        state.peerInfo[c].close();
        delete state.peerInfo[c];
      }

      state.userInfo = {};
      state.roomInfo = {}
      if (state.socket) state.socket.close();
      state.socket = null;

      state.isJoined = false;
      state.isCalling = false;
      state.studentName = '';
    },
    setJoinedStatus(state, bool) {
      state.isJoined = bool;
    },
    setCallingStatus(state, bool) {
      state.isCalling = bool;
    },
    setStudentName(state, name) {
      state.studentName = name;
    },
    setRunningTimeInfo(state, param) {
      state.runningTime = param;
    },
    setLogoURL(state, logoURL) {
      state.logoURL = logoURL;
    }
  },
})
