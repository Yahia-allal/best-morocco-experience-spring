import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import es from "./locales/es.json";

const savedLanguage = localStorage.getItem("bme-language");

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, es: { translation: es } },
  lng: savedLanguage || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export function setLanguage(language) {
  localStorage.setItem("bme-language", language);
  document.documentElement.lang = language;
  i18n.changeLanguage(language);
}

document.documentElement.lang = i18n.language;

export default i18n;
