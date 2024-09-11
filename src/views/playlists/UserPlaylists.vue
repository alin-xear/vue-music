<template>
  <div class="user-playlists">
    <h2>My playlists</h2>
    <div v-if="playlists && playlists.length > 0">
      <ListView :playlists="playlists" />
    </div>
    <div v-else>No playlists yet..</div>
    <RouterLink :to="{ name: 'CreatePlaylist' }" class="btn"
      >Create a new playlist
    </RouterLink>
    <br />
    <br />
    <br />
  </div>
</template>

<script setup>
import ListView from "@/components/ListView.vue";
import getCollection from "@/composables/getCollection";
import getUser from "@/composables/getUser";

const { user } = getUser();
const { documents: playlists } = getCollection("playlists", [
  "userId",
  "==",
  user.value.uid,
]);
</script>
