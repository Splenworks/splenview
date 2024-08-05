import React, { useCallback, useState } from "react"
import IconButton from "./IconButton"
import { toggleFullScreen } from "./utils/toggleFullscreen"
import ExitIcon from "./assets/icons/exit.svg?react"
import FullscreenIcon from "./assets/icons/expand.svg?react"
import ExitFullscreenIcon from "./assets/icons/compress.svg?react"
import Tooltip from "./Tooltip"
import { useTranslation } from "react-i18next"
import DarkModeSwitchIcon from "./DarkModeSwitchIcon"
import { getDarkmode, toggleDarkmode } from "./utils/darkmode"

interface FileInfoProps {
  fileName: string
  file: File
  pageIndex: number
  totalPages: number
  exit: () => void
  toggleInfoMode: () => void
}

const FileInfo: React.FC<FileInfoProps> = ({
  fileName,
  file,
  pageIndex,
  totalPages,
  exit,
  toggleInfoMode,
}) => {
  const isFullScreen = document.fullscreenElement !== null
  const { t } = useTranslation()
  const [darkMode, setDarkMode] = useState(getDarkmode())

  const fileSizeString = useCallback((size: number) => {
    if (size < 1024) return `${size} bytes`
    const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    let unitIndex = 0
    while (size >= 1024) {
      size /= 1024
      unitIndex++
    }
    return `${parseFloat(size.toFixed(2))} ${units[unitIndex]}`
  }, [])

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 text-white transition-opacity duration-300 ease-in-out"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,75%), rgba(0,0,0,0%), rgba(0,0,0,0%), rgba(0,0,0,75%)",
      }}
      onMouseUp={toggleInfoMode}
    >
      <div className="absolute top-0 left-0 right-1 md:right-4 flex justify-between">
        <div
          className="pt-2 md:pt-4 pl-4 md:pl-6 flex flex-col gap-1"
          onMouseUp={(e) => e.stopPropagation()}
        >
          <span className="font-semibold text-xl">{fileName}</span>
          <span className="font-semibold">
            {new Date(file.lastModified).toLocaleString()}
          </span>
          <span className="font-semibold">{fileSizeString(file.size)}</span>
        </div>
        <div
          className="pt-2 md:pt-4 flex gap-2"
          onMouseUp={(e) => e.stopPropagation()}
        >
          <div>
            <Tooltip text="Toggle Darkmode" place="bottom">
              <IconButton
                svgIcon={() => (
                  <DarkModeSwitchIcon darkMode={darkMode} size={20} />
                )}
                onClick={() => {
                  setDarkMode((darkMode) => !darkMode)
                  toggleDarkmode()
                }}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip text={t("others.exit")} place="bottom">
              <IconButton
                svgIcon={ExitIcon}
                onClick={exit}
                className="transform rotate-180"
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <div
        className="absolute bottom-2 left-4 right-1 md:bottom-4 md:left-6 md:right-4 flex justify-between items-center"
        onMouseUp={(e) => e.stopPropagation()}
      >
        <span className="font-semibold text-lg md:text-xl select-none">
          {totalPages > 1 ? `${pageIndex + 1} / ${totalPages}` : ""}
        </span>
        <div>
          <Tooltip
            text={
              isFullScreen ? t("others.exitFullscreen") : t("others.fullscreen")
            }
            place="top"
            align="right"
          >
            <IconButton
              svgIcon={isFullScreen ? ExitFullscreenIcon : FullscreenIcon}
              onClick={() => {
                toggleFullScreen()
                toggleInfoMode()
              }}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default FileInfo
