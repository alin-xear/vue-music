<template>
  <div class="error" v-if="error">{{ error }}</div>

  <div v-if="playlist" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl" :alt="playlist.title" width="400" />
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">
        {{ playlist.description }}
      </p>

      <button v-if="ownership" @click="handleDelete">Delete playlist</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">
        No songs have been added to this playlist yet
      </div>

      <div v-for="song in playlist.songs" class="single-song" :key="song.id">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button @click="handleDeleteSong(song.id)" v-if="ownership">
          delete
        </button>
      </div>

      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
  </div>
</template>

<script setup>
import AddSong from "@/components/AddSong.vue";
import useStorage from "@/composables/useStorage";
import useDocument from "@/composables/useDocument";
import getDocument from "@/composables/getDocument";
import getUser from "@/composables/getUser";
import { computed } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: String,
});

const { error, document: playlist } = getDocument("playlists", props.id);
const { user } = getUser();
const { deleteDoc, updateDoc } = useDocument("playlists", props.id);
const { deleteImage } = useStorage();
const router = useRouter();

const ownership = computed(() => {
  return (
    // playlist.value && user.value && user.value.uid === playlist.value.userId
    user.value?.uid === playlist.value?.userId
  );
});
const handleDelete = async () => {
  await deleteImage(playlist.value.filePath);
  await deleteDoc();
  router.push({
    name: "Home",
  });
};

const handleDeleteSong = async (id) => {
  const songs = playlist.value.songs.filter((song) => song.id != id);

  await updateDoc({
    songs,
  });

  console.log("Song has been removed from playlist");
};
</script>

<style lang="scss">
.single-song {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dashed var(--secondary);
  margin-bottom: 20px;
}
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 80px;
}
.cover {
  overflow: hidden;
  border-radius: 20px;
  position: relative;
  padding: 160px;
  img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
}
.playlist-info {
  text-align: center;
  h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
}
.description {
  text-align: left;
}
</style>
