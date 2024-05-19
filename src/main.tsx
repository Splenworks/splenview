import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import enTranslation from "./assets/translations/en.json"
import koTranslation from "./assets/translations/ko.json"
import jaTranslation from "./assets/translations/ja.json"
import { initReactI18next } from "react-i18next"
import "./index.css"

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      ko: {
        translation: koTranslation,
      },
      ja: {
        translation: jaTranslation,
      },
    },
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
