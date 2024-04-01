import React from "react"
import { FileList } from "./types/FileList"

interface FileListInfoProps {
  fileList: FileList
  currentIndex: number
}

const FileListInfo: React.FC<FileListInfoProps> = ({
  fileList,
  currentIndex,
}) => {
  const currentFileItem = fileList[currentIndex]
  return (
    <div className="absolute top-5 left-5 opacity-50 bg-black p-2">
      <span className="font-bold text-2xl text-white">
        {currentFileItem.displayName}
      </span>
    </div>
  )
}

export default FileListInfo
