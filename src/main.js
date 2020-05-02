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
      heading: {
        app: "Todos",
      },
      label: {
        filter: {
          all: "All",
          active: "Active",
          completed: "Completed",
        },
        complete: {
          all: "Complete all",
          one: "Complete",
        },
        add: {
          one: "Add task",
        },
        active: {
          all: "No items left | 1 item left | {n} items left",
        },
      },
      action: {
        remove: {
          one: "Delete",
          completed: "Clear completed",
        },
      },
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
