import React from "react"
import IconButton from "./IconButton"
import { ReactComponent as CloseIcon } from "./assets/xmark.svg"

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
  return (
    <div
      className="absolute inset-0 text-white transition-opacity duration-300 ease-in-out"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,75%), rgba(0,0,0,0%), rgba(0,0,0,0%), rgba(0,0,0,75%)",
      }}
      onTouchEnd={toggleInfoMode}
    >
      <div className="absolute top-4 left-6 right-4 flex justify-between items-center">
        <span className="font-semibold text-xl">{fileName}</span>
        <div onTouchEnd={(e) => e.stopPropagation()}>
          <IconButton id="exitButton" svgIcon={CloseIcon} onClick={exit} />
        </div>
      </div>
      <div className="absolute bottom-4 left-6 right-4 flex justify-between items-center">
        <span className="font-semibold text-xl">
          {totalPages > 1 ? `${pageIndex + 1} / ${totalPages}` : ""}
        </span>
      </div>
    </div>
  )
}

export default FileInfo
