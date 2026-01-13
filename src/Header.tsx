import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid"
import React from "react"
import { useTranslation } from "react-i18next"
import DarkModeSwitch from "./DarkModeSwitch"

interface HeaderProps {
  exited: boolean
  goBack: () => void
}

const LANGUAGE_OPTIONS = [
  { value: "en", label: "English" },
  { value: "ko", label: "한국어" },
  { value: "ja", label: "日本語" },
  { value: "es", label: "Español" },
  { value: "cn", label: "中文" },
]

const Header: React.FC<HeaderProps> = ({ exited, goBack }) => {
  const { t, i18n } = useTranslation()
  const normalizedLanguage = (i18n.resolvedLanguage || i18n.language || "en")
    .split("-")[0]
  const selectedLanguage = LANGUAGE_OPTIONS.some(
    (option) => option.value === normalizedLanguage,
  )
    ? normalizedLanguage
    : "en"
  return (
    <header className="absolute left-0 right-0 top-0 bg-white dark:bg-neutral-900">
      <div className="mx-8 flex h-16 items-center justify-center md:mx-16">
        <div className="flex flex-1">
          {exited && (
            <div
              className="flex cursor-pointer items-center gap-2"
              onClick={goBack}
            >
              <ArrowUturnLeftIcon className="h-5 w-5 text-black dark:text-white" />
              <span className="text-md font-semibold text-black dark:text-white">
                {t("header.goBack")}
              </span>
            </div>
          )}
        </div>
        <p className="text-xl font-semibold text-black dark:text-white">
          <span className="bg-linear-to-r from-pink-700 to-pink-900 dark:from-pink-700 dark:to-pink-500 text-transparent bg-clip-text">Splen</span>
          View
        </p>
        <div className="flex flex-1 items-center justify-end">
          <label className="sr-only" htmlFor="language-menu">
            Language
          </label>
          <select
            id="language-menu"
            className="mr-3 rounded-md border border-neutral-300 bg-white px-2 py-1 text-sm font-semibold text-black shadow-sm outline-none transition focus:border-pink-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
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
          <DarkModeSwitch />
        </div>
      </div>
    </header>
  )
}

export default Header
