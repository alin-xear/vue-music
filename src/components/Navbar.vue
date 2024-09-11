<template>
  <div class="navbar">
    <nav>
      <RouterLink :to="{ name: 'Home' }"
        ><img src="@/assets/ninja.png" alt="Muso Ninjas" />
      </RouterLink>
      <h1>
        <RouterLink :to="{ name: 'Home' }"> Muso Ninjas </RouterLink>
      </h1>
      <div class="links">
        <div v-if="user">
          <RouterLink :to="{ name: 'CreatePlaylist' }">
            Create Playlist</RouterLink
          >
          <RouterLink :to="{ name: 'UserPlaylists' }"> My Playlists</RouterLink>
          <span class="avatar">Hi there,{{ user.displayName }}</span>
          <button @click="handleLogout">Logout</button>
        </div>
        <div v-else>
          <RouterLink class="btn" :to="{ name: 'Signup' }">Sign up</RouterLink>
          <RouterLink class="btn" :to="{ name: 'Login' }">Log in</RouterLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from "@/composables/useLogout";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";
</script>

<script setup>
const { error, logout, isPending } = useLogout();
const router = useRouter();
const { user } = getUser();

// console.log(user.value);

const handleLogout = async () => {
  await logout();
  console.log("The user has logged out. Redirecting");
  router.push({ name: "Login" });
};
</script>

<style scoped lang="scss">
.navbar {
  padding: 16px 10px;
  margin-bottom: 60px;
  background: white;
}
nav {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}
nav h1 {
  margin-left: 20px;
}
.links {
  margin-left: auto;
}
nav .links a,
button {
  margin-left: 16px;
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 5px;
  &.router-link-active {
    background-color: var(--primary);
    color: white;
  }
}
nav img {
  max-height: 50px;
}
span {
  font-size: 14px;
  display: inline-block;
  margin-left: 16px;
  padding-left: 16px;
  border-left: 1px solid var(--secondary);
}
</style>
