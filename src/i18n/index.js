import Vue from "vue";
import VueI18n from "vue-i18n";
import merge from "lodash.merge";

Vue.use(VueI18n);

const DEFAULT_LOCAL = document.querySelector("html").getAttribute("lang");

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
  locale: DEFAULT_LOCAL,
  fallbackLocale: DEFAULT_LOCAL,
  messages,
});

const checkHasI18nMessages = (locale) =>
  Boolean(Object.keys(i18n.getLocaleMessage(locale)).length);

const fetchMessages = (...args) =>
  fetch(`./i18n/${args.join(".")}.json`).then((response) => response.json());

const setI18nLocal = (locale) => {
  i18n.locale = locale;
  document.querySelector("html").setAttribute("lang", locale);
};

export const fetchI18nMessages = ({ locale = DEFAULT_LOCAL }) =>
  setI18nLocal(locale) || checkHasI18nMessages(locale)
    ? Promise.resolve()
    : Promise.all([fetchMessages(locale), fetchMessages(locale, skew)]).then(
        ([messageBase, messageModifier]) => {
          i18n.setLocaleMessage(locale, merge(messageBase, messageModifier));
        }
      );
