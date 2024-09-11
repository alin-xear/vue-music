<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>

    <button v-if="!isPending">Log in</button>
    <button v-if="isPending" disabled>Logging in...</button>
  </form>
</template>

<script setup>
import useLogin from "@/composables/useLogin";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { error, login, isPending } = useLogin();
const email = ref("");
const password = ref("");
const router = useRouter();

const handleSubmit = async () => {
  const res = await login(email.value, password.value);
  console.log(res);
  if (!error.value) console.log("user logged in");
  router.push({ name: "UserPlaylists" });
  // alert("User logged in");
};
</script>
