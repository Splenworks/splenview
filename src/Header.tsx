import React from "react"
import DarkModeSwitch from "./DarkModeSwitch"
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid"

interface HeaderProps {
  exited: boolean
  goBack: () => void
}

const Header: React.FC<HeaderProps> = ({ exited, goBack }) => {
  return (
    <header className="absolute top-0 left-0 right-0 bg-white dark:bg-neutral-900">
      <div className="flex items-center justify-center h-16 mx-8 md:mx-16">
        <div
          className="flex-1 flex items-center gap-2 cursor-pointer"
          onClick={() => exited && goBack()}
        >
          {exited && (
            <>
              <ArrowUturnLeftIcon className="h-5 w-5 text-black dark:text-white" />
              <span className="text-black dark:text-white text-md font-semibold">
                Go Back
              </span>
            </>
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
