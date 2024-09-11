<template>
  <div v-for="playlist in playlists" :key="playlist.id">
    <RouterLink :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }">
      <div class="single">
        <div class="thumbnail">
          <img :src="playlist.coverUrl" :alt="playlist.title" width="100" />
        </div>
        <div class="info">
          <h3>{{ playlist.title }}</h3>
          <p>Created by {{ playlist.userName }}</p>
        </div>
        <div class="song-number">
          <p>{{ playlist.songs.length }} songs in playlist</p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  playlists: String,
});
</script>

<style scoped lang="scss">
.single {
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: white;
  margin: 16px 0;
  transition: all ease 0.2s;
  &:hover {
    box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.05);
    transform: scale(1.02);
  }
}

.thumbnail {
  max-width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.info {
  margin: 0 30px;
}

.song-number {
  margin-left: auto;
}
</style>
