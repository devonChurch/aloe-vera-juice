import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { i18n, fetchI18nMessages } from "./i18n";

Vue.config.productionTip = false;

// if (process.env.NODE_ENV !== "production") {
//   const VueAxe = require("vue-axe");
//   Vue.use(VueAxe, {
//     /** ... */
//   });
// }

router.beforeEach((to, from, next) => fetchI18nMessages().then(() => next()));

new Vue({
  i18n,
  router,
  render: (h) => h(App),
}).$mount("#app");
