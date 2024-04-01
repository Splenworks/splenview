import React from "react"

interface FileInfoProps {
  fileName: string
}

const FileInfo: React.FC<FileInfoProps> = ({ fileName }) => {
  return (
    <div className="absolute top-5 left-5 opacity-50 bg-black p-2">
      <span className="font-bold text-2xl text-white">{fileName}</span>
    </div>
  )
}

export default FileInfo
