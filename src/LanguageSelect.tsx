import { GlobeAltIcon } from "@heroicons/react/24/outline"
import { useTranslation } from "react-i18next"

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "ko", label: "한국어" },
  { value: "ja", label: "日本語" },
  { value: "es", label: "Español" },
  { value: "cn", label: "中文" },
]

const LanguageSelect = () => {
  const { i18n } = useTranslation()
  const normalizedLanguage = (i18n.resolvedLanguage || i18n.language || "en")
    .split("-")[0]
  const selectedLanguage = LANGUAGE_OPTIONS.some(
    (option) => option.value === normalizedLanguage,
  )
    ? normalizedLanguage
    : "en"

  return (
    <div className="mr-3 flex items-center gap-2">
      <GlobeAltIcon className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
      <select
        id="language-menu"
        className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm font-semibold text-black shadow-sm outline-none transition focus:border-pink-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
        value={selectedLanguage}
        onChange={(event) => {
          i18n.changeLanguage(event.target.value)
        }}
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelect
