import React, { useState } from "react"
import { twJoin } from "tailwind-merge"
import { getImageFiles } from "./utils/sortFiles"

interface DragDropAreaProps {
  setDroppedFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const DragDropArea: React.FC<DragDropAreaProps> = ({ setDroppedFiles }) => {
  const [dragging, setDragging] = useState(false)

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files)
    setDroppedFiles(getImageFiles(files))
  }

  return (
    <div
      className={twJoin(
        "fixed top-0 left-0 right-0 bottom-0",
        dragging && "dragging",
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div
        className={twJoin(
          "absolute inset-10 rounded-xl border-dashed border-4 border-gray-300 flex items-center justify-center transition-colors duration-300 ease-in-out",
          dragging && "border-blue-500 bg-blue-100",
        )}
      >
        <p className="text-xl font-bold">
          {dragging ? "Drop here" : "Drag and drop any image files here"}
        </p>
      </div>
    </div>
  )
}

export default DragDropArea
