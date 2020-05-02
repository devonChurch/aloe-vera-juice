import Vue from "vue";
import VueI18n from "vue-i18n";

import App from "./App.vue";

Vue.config.productionTip = false;

// if (process.env.NODE_ENV !== "production") {
//   const VueAxe = require("vue-axe");
//   Vue.use(VueAxe, {
//     /** ... */
//   });
// }

const messages = {
  en: {
    message: {
      hello: "hello world",
    },
  },
};

Vue.use(VueI18n);

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: "en", // set locale
  messages, // set locale messages
});

new Vue({
  i18n,
  render: (h) => h(App),
}).$mount("#app");
