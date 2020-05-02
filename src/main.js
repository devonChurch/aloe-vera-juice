import Vue from "vue";
import VueI18n from "vue-i18n";
import merge from "lodash.merge";
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
  en: {},
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
  const fetchMessages = (...args) =>
    fetch(`./i18n/${args.join(".")}.json`).then((response) => response.json());

  if (hasI18nMessages) {
    next();
  } else {
    Promise.all([fetchMessages("en"), fetchMessages("en", "school")]).then(
      ([messageBase, messageModifier]) => {
        i18n.setLocaleMessage("en", merge(messageBase, messageModifier));
        next();
      }
    );
  }
});

new Vue({
  i18n,
  router,
  render: (h) => h(App),
}).$mount("#app");
