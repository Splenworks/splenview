import React from "react"
import IconButton from "./IconButton"
import { ReactComponent as CloseIcon } from "./assets/xmark.svg"

interface FileInfoProps {
  fileName: string
}

const FileInfo: React.FC<FileInfoProps> = ({ fileName }) => {
  return (
    <div
      className="absolute inset-0 text-white transition-opacity duration-300 ease-in-out"
      style={{
        background:
          "linear-gradient(to bottom, rgba(0,0,0,75%),  rgba(0,0,0,0%), rgba(0,0,0,0%), rgba(0,0,0,75%)",
      }}
    >
      <div className="absolute top-4 left-6 right-4 flex justify-between items-center">
        <span className="font-semibold text-xl">{fileName}</span>
        <IconButton
          id="exitButton"
          svgIcon={CloseIcon}
          onClick={() => {
            alert("exit")
            // if (controlsRef.current?.style.opacity !== "0") {
            //   exit()
            // }
          }}
        />
      </div>
    </div>
  )
}

export default FileInfo
