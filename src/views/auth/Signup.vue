<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input type="text" placeholder="Display Name" v-model="displayName" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>

    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading...</button>
  </form>
</template>

<script>
import { ref } from "vue";
import useSignup from "@/composables/useSignup";
import { useRouter } from "vue-router";

export default {
  setup() {
    const { error, signup, isPending } = useSignup();

    const email = ref("");
    const password = ref("");
    const displayName = ref("");
    const router = useRouter();
    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayName.value);

      !res.value && router.push({ name: "UserPlaylists" });
    };

    return { email, password, displayName, isPending, handleSubmit, error };
  },
};
</script>
