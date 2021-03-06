import Vue from "vue";
import Vuex from "vuex";

// Modules
import app from "./app";
import lp from "./lp";
import appConfig from "./app-config";
import verticalMenu from "./vertical-menu";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    lp,
    verticalMenu,
  },
  strict: process.env.DEV,
});
