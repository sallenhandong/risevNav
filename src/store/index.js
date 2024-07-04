import { createStore } from "vuex";

export default createStore({
  state: {
    theme: "light",
  },
  getters: {
    currentTheme: (state) => state.theme,
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme;
    },
  },
  actions: {
    toggleTheme({ commit, getters }) {
      // 切换主题的 action，可以包含异步逻辑
      let newTheme = getters.currentTheme === "light" ? "dark" : "light"; // 假设有一个 getCurrentTheme 的 getter
      commit("setTheme", newTheme);
    },
  },
  modules: {},
});
