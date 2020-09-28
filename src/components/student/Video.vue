<template>
  <VideoConsult v-if="video.videoOn" />
<!--  <HideVideoConsult v-if="video.videoHideOn" />-->
<!--  <DisplayShare v-if="video.shareOn" />-->
<!--  <HideDisplayShare v-if="video.shareHideOn" />-->
</template>

<script>
import { eBus } from '../../commons/eventBus';

export default {
  name: "Video"
}
</script>
