<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "todo-added"]);

const title = ref("");
const description = ref("");
const loading = ref(false);
const $q = useQuasar();

const handleSubmit = async () => {
  if (!title.value.trim() || !description.value.trim()) {
    $q.notify({ type: "negative", message: "Fields are required." });
    return;
  }
  loading.value = true;
  try {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/todo`,
      {
        title: title.value,
        description: description.value,
      },
      { withCredentials: true }
    );
    emit("todo-added");
    emit("update:modelValue", false); 
    $q.notify({ type: "positive", message: "Todo added successfully!" });
  } catch (error) {
    console.error("Failed to add todo:", error.response || error); 
    $q.notify({ type: "negative", message: "Failed to add todo." });
  } finally {
    loading.value = false;
  }
};

const handleClose = () => {
  emit("update:modelValue", false); 
};

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      title.value = "";
      description.value = "";
    }
  },
  { immediate: true }
);
</script>

<template>
  <q-dialog :model-value="props.modelValue" @update:model-value="handleClose" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Add Todo</div>
        <q-space />
        <q-btn icon="close" flat round dense @click="handleClose" />
      </q-card-section>
      <q-form @submit.prevent="handleSubmit">
        <q-card-section class="q-gutter-md">
          <q-input outlined v-model="title" label="Title" :disable="loading" />
          <q-input
            outlined
            v-model="description"
            label="Description"
            :disable="loading"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            :loading="loading"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>