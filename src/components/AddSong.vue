<template>
  <div class="add-song">
    <button @click="showForm = true" v-if="!showForm">Add Songs</button>

    <form @submit.prevent="handleSubmit" v-if="showForm">
      <h4>Add a New Song</h4>
      <input type="text" placeholder="Song title" required v-model="title" />
      <input type="text" placeholder="Artist" required v-model="artist" />
      <button>Add</button>
    </form>
  </div>
</template>

<script setup>
import useDocument from "@/composables/useDocument";
import { defineProps, ref } from "vue";

const title = ref("");
const artist = ref("");
const showForm = ref(false);
const props = defineProps({
  playlist: String,
});

const { updateDoc, error, isPending } = useDocument(
  "playlists",
  props.playlist.id
);

const handleSubmit = async () => {
  const newSong = {
    title: title.value,
    artist: artist.value,
    // id: Math.floor(Math.random() * 1000000),
    id: Date.parse(new Date()),
  };

  await updateDoc({
    songs: [...props.playlist.songs, newSong],
  });

  title.value = "";
  artist.value = "";

  showForm.value = false;
};
</script>

<style lang="scss" scoped>
.add-song {
  margin-top: 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>
