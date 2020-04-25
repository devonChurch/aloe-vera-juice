import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

if (process.env.NODE_ENV !== "production") {
  const VueAxe = require("vue-axe");
  Vue.use(VueAxe, {
    /** ... */
  });
}

new Vue({
  render: (h) => h(App),
}).$mount("#app");
