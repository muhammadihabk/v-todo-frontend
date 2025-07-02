<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const todos = ref([]);
const page = ref(1);

const fetchTodos = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/todo/find`,
      {
        page: page.value,
      },
      {
        withCredentials: true,
      }
    );
    page.value++;

    todos.value.push(...res.data.todos);
  } catch (error) {
    console.log(error);
  }
};

onMounted(fetchTodos);

const addTodo = () => {};
const editTodo = (todo) => {};
const completeTodo = async (todo) => {};
const deleteTodo = async (todo) => {};
</script>

<template>
  <div class="list">
    <div class="options">
      <q-btn icon="add" color="primary" @click="addTodo" flat />
    </div>
    <div>
      <div v-for="todo in todos" :key="todo._id" class="todo-item q-mb-md">
        <div style="display: flex; gap: 8px; margin-inline-start: auto">
          <q-btn size="sm" flat dense icon="edit" @click="editTodo(todo)" />
          <q-checkbox
            v-model="todo.completed"
            @update:model-value="() => completeTodo(todo)"
          />
          <q-btn
            size="sm"
            flat
            dense
            icon="close"
            color="purple"
            @click="deleteTodo(todo)"
          />
        </div>
        <h2>{{ todo.title }}</h2>
        <p>{{ todo.description }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.list {
  max-width: 25rem;
  margin-inline: auto;
  margin-block: 7rem;
}
.options {
  display: flex;
  justify-content: flex-end;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-block-end: 1px solid $secondary;
  padding: 8px;

  h2 {
    font-size: 2rem;
  }
}
</style>
