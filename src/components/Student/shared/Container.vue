<template>
   <div class="container">
      <div class="chatContainer">
         <div class="chatContent">
            <!-- <div v-for="(i, idx) in chatMessage" v-bind:key="idx" v-bind:class="{ message: true, left: i}"> -->
            <!-- <div v-for="i in chatMessage" v-bind:key="i.idx" v-bind:class="{ left: i.type === 'left', right: i.type === 'right' }" class="message">
               <div class="bubble">
                  <span v-if="i.time" class="time">{{ i.time }}</span>
                  <p>{{ i.contents }}</p>
               </div>
               <div class="bubble">
                  <span v-if="i.time" class="time">{{ i.time }}</span>
                  <p>{{ i.contents }}</p>
               </div>
            </div> -->
            
            <div v-for="i in chatMessage" v-bind:key="i.idx" v-bind:class="{ left: i.type === 'left', right: i.type === 'right' }" class="message">
               <div class="bubble">
                  <!-- <span v-if="i.time" class="time">{{ i.time }}</span> -->
                  <p>{{ i.contents }}</p>
               </div>
               <div class="bubble">
                  <span v-if="i.time" class="time">{{ i.time }}</span>
                  <p>{{ i.contents }}</p>
               </div>
            </div>


            <!-- <p>{{ chatNotice }}</p> -->
            <!-- <div class="message left">
               <div class="name">상담사</div>
               <div class="bubble">
                  <p>안녕하세요.</p>
               </div>
               <div class="bubble">
                  <p>한국대학교입니다.</p>
                  <span class="time">오후 00:00</span>
               </div>
            </div>
            <div class="message right">
               <div class="bubble">
                  <p>안녕하세요.</p>
               </div>
               <div class="bubble">
                  <p>홍길동입니다.</p>
               </div>
               <div class="bubble">
                  <span class="time">오후 00:00</span>
                  <p>입시상담요청 드려요.</p>
               </div>
            </div>
            <div class="message left">
               <div class="name">상담사</div>
               <div class="bubble">
                  <p>화상으로 상담드리겠습니다.</p>
               </div>
               <div class="bubble">
                  <p>화면이 나오는걸 원치 않으시면 카메라를 꺼주시면 됩니다.</p>
                  <span class="time">오후 00:00</span>
               </div>
            </div>
            <p>화상상담이 시작되었습니다.</p> -->
         </div>
         <div class="chatInput">
            <input tyle="text" placeholder="메시지를 입력하세요.">
            <button>전송</button>
         </div>
      </div>
      <VideoConsult v-if="video.videoOn" />
      <HideVideoConsult v-if="video.videoHideOn" />
      <DisplayShare v-if="video.shareOn" />
      <HideDisplayShare v-if="video.shareHideOn" />
   </div>
</template>

<script>
import VideoConsult from '@/components/student/VideoConsult/StudentVideoConsult'
import HideVideoConsult from '@/components/student/VideoConsult/StudentVideoConsultHide'
import DisplayShare from '@/components/student/DisplayShare/StudentDisplayShare'
import HideDisplayShare from '@/components/student/DisplayShare/StudentDisplayShareHide'
import { eBus } from '../../../commons/eventBus';

export default {
   data() {
      return {
         chatMessage: [
            {
               type: 'right', // info, left, right,
               contents: '안녕하세요',
               // time: '오전 00:00' // new Date() -> 오전 00:00 / 오후 0:00
            },
            {
               type: 'left', // info, left, right,
               contents: '안녕하세요요요요요',
               time: '오전 00:00' // new Date() -> 오전 00:00 / 오후 0:00
            },
            // {
            //    type: 'right', // info, left, right,
            //    contents: '안녕하세요',
            //    // time: '오전 00:00' // new Date() -> 오전 00:00 / 오후 0:00
            // },
            // {
            //    type: 'right', // info, left, right,
            //    contents: '안녕하세요222',
            //    time: '오전 00:00' // new Date() -> 오전 00:00 / 오후 0:00
            // },
            // {
            //    type: 'left', // info, left, right,
            //    contents: '안녕하세요요요요요',
            //    time: '오전 00:00' // new Date() -> 오전 00:00 / 오후 0:00
            // },
            // {
            //    type: 'left', // info, left, right,
            //    contents: '안녕하세요요요요요',
            //    time: '오전 00:00' // new Date() -> 오전 00:00 / 오후 0:00
            // }
         ],
         video: {
            videoOn:false,
            videoHideOn:false,
            shareOn:false,
            shareHideOn:false
         },
         chatNotice: '상담이 시작되었습니다.'
      }
   },
   components: {
      VideoConsult,
      HideVideoConsult,
      DisplayShare,
      HideDisplayShare
   },
   created() {
      //비디오 onoff
      eBus.$on('video', param => {
         this.video = {
            videoOn: param.videoOn,
            shareOn: param.shareOn,
            videoHideOn: param.videoHideOn,
            shareHideOn: param.shareHideOn,
         }
      });
      //chatNotice append
      eBus.$on('popUp', param => {
         if( param.contents = '화면 공유를 종료하시겠습니까?' ){
            this.chatNotice = '화면 공유가 종료되었습니다.'
         } else if( param.contents = '화상 상담을 종료하시겠습니까?' ) {
            this.chatNotice = '화상 상담이 종료되었습니다.'
         }
      })
   }
}
</script>