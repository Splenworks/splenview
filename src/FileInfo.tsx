import React, { useCallback } from "react"
import IconButton from "./IconButton"
import { toggleFullScreen } from "./utils/toggleFullscreen"
import CloseIcon from "./assets/xmark.svg?react"
import ExitIcon from "./assets/exit.svg?react"
import FullscreenIcon from "./assets/expand.svg?react"
import ExitFullscreenIcon from "./assets/compress.svg?react"
import { useMediaQuery } from "usehooks-ts"

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
  const isTouchDevice = useMediaQuery("(pointer: coarse)")
  const isFullScreen = document.fullscreenElement !== null

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
      onTouchEnd={toggleInfoMode}
    >
      <div className="absolute top-2 left-4 right-1 md:top-4 md:left-6 md:right-4 flex justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-semibold text-xl">{fileName}</span>
          <span className="font-semibold">
            {new Date(file.lastModified).toLocaleString()}
          </span>
          <span className="font-semibold">{fileSizeString(file.size)}</span>
        </div>
        <div className="flex gap-2" onTouchEnd={(e) => e.stopPropagation()}>
          <IconButton
            svgIcon={ExitIcon}
            onClick={exit}
            className="transform rotate-180"
          />
          {!isTouchDevice && (
            <IconButton
              id="exitButton"
              svgIcon={CloseIcon}
              onClick={toggleInfoMode}
            />
          )}
        </div>
      </div>
      <div
        className="absolute bottom-2 left-4 right-1 md:bottom-4 md:left-6 md:right-4 flex justify-between items-center"
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <span className="font-semibold text-xl  select-none">
          {totalPages > 1 ? `${pageIndex + 1} / ${totalPages}` : ""}
        </span>
        {isFullScreen ? (
          <IconButton
            svgIcon={ExitFullscreenIcon}
            onClick={() => {
              toggleFullScreen()
              toggleInfoMode()
            }}
          />
        ) : (
          <IconButton
            svgIcon={FullscreenIcon}
            onClick={() => {
              toggleFullScreen()
              toggleInfoMode()
            }}
          />
        )}
      </div>
    </div>
  )
}

export default FileInfo
