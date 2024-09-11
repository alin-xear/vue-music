<script setup></script>

<template>
  <div class="home">
    <div class="error" v-if="error">Could not fetch the data -- {error}</div>
    <ListView :playlists="documents" :error="error" />
  </div>
</template>

<script setup>
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView.vue";

const { error, documents } = getCollection("playlists");
// console.log(error);
</script>
