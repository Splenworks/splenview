import React from "react"
import IconButton from "./IconButton"
import { toggleFullScreen } from "./utils/toggleFullscreen"
import { ReactComponent as CloseIcon } from "./assets/xmark.svg"
import { ReactComponent as ExitIcon } from "./assets/exit.svg"
import { ReactComponent as FullscreenIcon } from "./assets/expand.svg"
import { ReactComponent as ExitFullscreenIcon } from "./assets/compress.svg"
import { useMediaQuery } from "usehooks-ts"

interface FileInfoProps {
  fileName: string
  pageIndex: number
  totalPages: number
  exit: () => void
  toggleInfoMode: () => void
}

const FileInfo: React.FC<FileInfoProps> = ({
  fileName,
  pageIndex,
  totalPages,
  exit,
  toggleInfoMode,
}) => {
  const isTouchDevice = useMediaQuery("(pointer: coarse)")
  const isFullScreen = document.fullscreenElement !== null

  return (
    <div
      className="fixed top-0 bottom-0 left-0 right-0 text-white transition-opacity duration-300 ease-in-out"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,75%), rgba(0,0,0,0%), rgba(0,0,0,0%), rgba(0,0,0,75%)",
      }}
      onTouchEnd={toggleInfoMode}
    >
      <div className="absolute top-2 left-4 right-1 md:top-4 md:left-6 md:right-4 flex justify-between items-center">
        <span className="font-semibold text-xl">{fileName}</span>
        <div
          className="flex gap-2 items-center"
          onTouchEnd={(e) => e.stopPropagation()}
        >
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
        <span className="font-semibold text-xl">
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
