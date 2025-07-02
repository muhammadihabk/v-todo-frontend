<script setup>
import { reactive } from "vue";
import { useRouter} from 'vue-router';
import { useUserStore } from "stores/user";
import axios from "axios";

const formData = reactive({
  name: "",
  email: "",
  password: "",
});
const userStore = useUserStore();
const router = useRouter();


const onSubmit = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/signup`,
      formData,
      {
        withCredentials: true,
      }
    );


    userStore.setUser(res.data.user);
    router.push('/todos');
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="q-pa-md fixed-center" style="max-width: 25rem">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input
        outlined
        v-model="formData.name"
        label="Full Name"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Required']"
      />
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
