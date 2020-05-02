import Vue from "vue";
import VueI18n from "vue-i18n";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

// if (process.env.NODE_ENV !== "production") {
//   const VueAxe = require("vue-axe");
//   Vue.use(VueAxe, {
//     /** ... */
//   });
// }

const messages = {
  en: {
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
};

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en", // set locale
  messages, // set locale messages
});

router.beforeEach((to, from, next) => {
  const hasI18nMessages = Boolean(
    Object.keys(i18n.getLocaleMessage("en")).length
  );
  console.log({ hasI18nMessages });
  next();
});

new Vue({
  i18n,
  router,
  render: (h) => h(App),
}).$mount("#app");
