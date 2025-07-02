<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "stores/user";
import { useQuasar } from "quasar";

import axios from "axios";

const formData = reactive({
  email: "",
  password: "",
});
const userStore = useUserStore();
const router = useRouter();
const $q = useQuasar();

const onSubmit = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_AUTH_URL}/signin`,
      formData,
      {
        withCredentials: true,
      }
    );

    userStore.setUser(res.data.user);
    router.push("/todos");
  } catch (error) {
    console.log(error);

    // Determine the error message
    let errorMessage = "An unexpected error occurred.";
    if (error.response) {
      if (error.response.status >= 400 && error.response.status <= 409) {
        errorMessage = "Invalid email or password.";
      } else if (error.response.status === 409) {
        errorMessage = "Email already registered.";
      }
    } else {
      errorMessage = `Server error: ${error.response.status}`;
    }

    $q.notify({
      type: "negative",
      message: errorMessage,
      position: "top",
      timeout: 5000,
    });

    formData.password = "";
  }
};
</script>

<template>
  <div class="q-pa-md fixed-center" style="max-width: 25rem">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        outlined
        v-model="formData.email"
        label="Email"
        type="email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Required']"
      />
      <q-input
        outlined
        v-model="formData.password"
        label="Password"
        type="password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Required']"
      />

      <div align="right">
        <q-btn label="Submit" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>
