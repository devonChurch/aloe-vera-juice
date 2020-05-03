import Vue from "vue";
import VueI18n from "vue-i18n";
import merge from "lodash.merge";

Vue.use(VueI18n);

const locale = document.querySelector("html").getAttribute("lang");

const skew = (() => {
  const skews = ["school", "home", "work"];
  const [skew] = window.location.hostname.split(".");
  const hasSkew = skews.includes(skew);

  return hasSkew ? skew : skews[0];
})();

const messages = {
  //   en: {},
  //   fr: {},
  //   ja: {},
};

export const i18n = new VueI18n({
  locale,
  messages,
});

const checkHasI18nMessages = () =>
  Boolean(Object.keys(i18n.getLocaleMessage(locale)).length);

const fetchMessages = (...args) =>
  fetch(`./i18n/${args.join(".")}.json`).then((response) => response.json());

export const fetchI18nMessages = () =>
  checkHasI18nMessages()
    ? Promise.resolve()
    : Promise.all([fetchMessages(locale), fetchMessages(locale, skew)]).then(
        ([messageBase, messageModifier]) => {
          i18n.setLocaleMessage(locale, merge(messageBase, messageModifier));
        }
      );
