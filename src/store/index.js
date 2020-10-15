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
    isSharing: false,
    studentName: '',
    callStatus: {
      video: false,
      audio: false
    }
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
    endCall(state) {
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

      state.isCalling = false;
      state.isSharing = false;
      state.callStatus = {
        video: false,
        audio: false
      }
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
      state.isSharing = false;
      state.callStatus = {
        video: false,
        audio: false
      }
      // state.studentName = '';
    },
    setJoinedStatus(state, bool) {
      state.isJoined = bool;
    },
    setCallingStatus(state, bool) {
      state.isCalling = bool;
    },
    setSharingStatus(state, bool) {
      state.isSharing = bool;
    },
    setStudentName(state, name) {
      state.studentName = name;
    },
    setCallStatus(state, data) {
      if (data.hasOwnProperty('video')) state.callStatus.video = data.video;
      if (data.hasOwnProperty('audio')) state.callStatus.audio = data.audio;
    }
  },
})
