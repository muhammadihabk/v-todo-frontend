<template>
  <q-layout view="hHh LpR fFf">
    <q-header
      bordered
      class="bg-primary text-white row no-wrap"
      height-hint="98"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="done_outline" />
          <span class="q-ml-sm">Todos</span>
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="right">
        <q-route-tab to="/signin" label="Sign In" />
        <q-route-tab to="/signup" label="Sign Up" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
