<template>
  <div class="tracktitle flex">
    <div @click.prevent="$emit('play')" class="thumbnail">
      <img :src="imguri + track.image" class="album-art image rounded-sm" />
      <div
        class="now-playing-track-indicator image"
        v-if="is_current"
        :class="{ last_played: !is_current_playing }"
      ></div>
    </div>
    <div v-tooltip class="song-title">
      <div class="with-flag" @click.prevent="$emit('play')">
        <span class="title ellip">
          {{ track.title }}
        </span>
        <MasterFlag :bitrate="track.bitrate" />
      </div>
      <div class="isSmallArtists" style="display: none">
        <ArtistName :artists="track.artist" :albumartists="track.albumartist" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Track } from "@/interfaces";
const imguri = paths.images.thumb.small;

import ArtistName from "../ArtistName.vue";
import MasterFlag from "../MasterFlag.vue";

import { paths } from "@/config";

defineProps<{
  track: Track;
  is_current: boolean;
  is_current_playing: boolean;
}>();

defineEmits<{
  (e: "play"): void;
}>();
</script>

<style lang="scss">
.songlist-item > .tracktitle {
  position: relative;
  align-items: center;

  .thumbnail {
    margin-right: $small;
    display: flex;

    .album-art {
      width: 3rem;
      height: 3rem;
      cursor: pointer;
      z-index: 20;
    }

    .now-playing-track-indicator {
      position: absolute;
      left: $small;
      top: $small;
      z-index: 20;
    }
  }

  .song-title {
    .with-flag {
      display: flex;
      align-items: center;
    }

    cursor: pointer;

    .title {
      margin-bottom: 2px;
    }
  }
}
</style>