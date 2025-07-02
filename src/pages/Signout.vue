<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "stores/user";
import axios from "axios";

const userStore = useUserStore();
const router = useRouter();

onMounted(async () => {
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/logout`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    console.log(error);
  } finally {
    userStore.clearUser();
    router.replace("/");
  }
});
</script>

<template>
  <div class="q-pa-md fixed-center">
    <q-spinner size="2em" color="primary" />
    <div>Signing out...</div>
  </div>
</template>
