<script setup>
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { isAuthenticated } = storeToRefs(userStore);
console.log("sdg,.sd", isAuthenticated);
</script>

<template>
  <q-layout view="hHh LpR fFf">
    <q-header
      bordered
      class="bg-primary text-white row no-wrap"
      height-hint="98"
    >
      <q-toolbar>
        <q-btn flat no-caps to="/">
          <q-toolbar-title>
            <q-icon name="done_outline" />
            <span class="q-ml-sm">Todos</span>
          </q-toolbar-title>
        </q-btn>
      </q-toolbar>

      <q-tabs align="right">
        <template v-if="!isAuthenticated">
          <q-route-tab to="/signup" label="Sign Up" />
          <q-route-tab to="/signin" label="Sign In" />
        </template>

        <template v-if="isAuthenticated">
          <q-route-tab to="/todos" label="Todos" />
          <q-route-tab to="/signout" label="Sign Out" />
        </template>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
