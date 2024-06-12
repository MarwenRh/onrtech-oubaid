import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .use(LanguageDetector) // Detects user language
  .use(HttpApi) // Loads translations using HTTP backend
  .init({
    fallbackLng: "en", // Fallback language
    detection: {
      order: ["localStorage", "cookie", "htmlTag", "path", "subdomain"], // Order of language detection
      caches: ["localStorage"], // Cache the language in localStorage
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json", // Path to the translation files
    },
    react: {
      useSuspense: true, // Use Suspense for handling the loading state
    },
    debug: true, // Enable debug mode for development
  });

export default i18n;
