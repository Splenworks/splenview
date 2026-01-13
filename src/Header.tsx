import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid"
import React from "react"
import { useTranslation } from "react-i18next"
import DarkModeSwitch from "./DarkModeSwitch"
import LanguageSelect from "./LanguageSelect"

interface HeaderProps {
  exited: boolean
  goBack: () => void
}

const Header: React.FC<HeaderProps> = ({ exited, goBack }) => {
  const { t } = useTranslation()
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
        <div className="flex flex-1 items-center justify-end gap-1">
          <LanguageSelect />
          <DarkModeSwitch />
        </div>
      </div>
    </header>
  )
}

export default Header
