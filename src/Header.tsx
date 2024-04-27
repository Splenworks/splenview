import React from "react"
import DarkModeSwitch from "./DarkModeSwitch"
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid"
import { useTranslation } from "react-i18next"

interface HeaderProps {
  exited: boolean
  goBack: () => void
}

const Header: React.FC<HeaderProps> = ({ exited, goBack }) => {
  const { t } = useTranslation()
  return (
    <header className="absolute top-0 left-0 right-0 bg-white dark:bg-neutral-900">
      <div className="flex items-center justify-center h-16 mx-8 md:mx-16">
        <div className="flex-1 flex">
          {exited && (
            <div
              className="flex items-center cursor-pointer gap-2"
              onClick={goBack}
            >
              <ArrowUturnLeftIcon className="h-5 w-5 text-black dark:text-white" />
              <span className="text-black dark:text-white text-md font-semibold">
                {t("header.goBack")}
              </span>
            </div>
          )}
        </div>
        <p className="text-black dark:text-white text-lg font-semibold">
          Splen<span className="text-pink-900 dark:text-pink-700">View</span>
        </p>
        <div className="flex-1 flex justify-end items-center">
          <DarkModeSwitch />
        </div>
      </div>
    </header>
  )
}

export default Header
