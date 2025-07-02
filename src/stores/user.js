import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null,
    isAuthenticated: false,
  }),
  actions: {
    setUser(user) {
      this.currentUser = user;
      this.isAuthenticated = !!user;
    },
    clearUser() {
      this.currentUser = null;
      this.isAuthenticated = false;
    },
  },
  getters: {
    getUser: (state) => state.currentUser,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
});
