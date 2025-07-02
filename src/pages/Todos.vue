<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import AddTodoModal from "../components/AddTodoModal.vue";

const todos = ref([]);
const page = ref(1);
const showModal = ref(false);

const fetchTodos = async () => {
  try {
    todos.value = [];
    page.value = 1;

    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/todo/find`,
      {
        page: page.value,
      },
      {
        withCredentials: true,
      }
    );

    todos.value = res.data.todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

onMounted(fetchTodos);

const addTodo = () => {
  showModal.value = true;
};

const handleTodoAdded = () => {
  showModal.value = false;
  fetchTodos();
};

const editTodo = (todo) => {};
const completeTodo = async (todo) => {};
const deleteTodo = async (todo) => {};
</script>

<template>
  <div class="list">
    <div class="options">
      <q-btn icon="add" color="primary" @click="addTodo" flat />
    </div>
    <AddTodoModal v-model="showModal" @todo-added="handleTodoAdded" />

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
