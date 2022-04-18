import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    currentUser: null,
  }),
  getters: {
    getUser: (state) => state.currentUser,
  },
  actions: {
    clear() {
      this.currentUser = null
    },
    addUser(currentUser) {
      this.currentUser = currentUser;
    }
  }
});
