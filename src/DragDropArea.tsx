import React, { useRef, useState } from "react"
import { twJoin } from "tailwind-merge"
import { getImageFiles } from "./utils/getImageFiles"

interface DragDropAreaProps {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const DragDropArea: React.FC<DragDropAreaProps> = ({ setFiles }) => {
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    const files = Array.from(e.dataTransfer.files)
    const imageFiles = await getImageFiles(files)
    setFiles(imageFiles)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || [])
    const imageFiles = await getImageFiles(files)
    setFiles(imageFiles)
  }

  return (
    <div className="fixed top-0 left-0 right-0 bottom-4">
      <div
        className={twJoin(
          "absolute inset-10 rounded-xl border-dashed border-4 border-gray-300 cursor-pointer flex items-center justify-center transition-colors duration-300 ease-in-out",
          dragging && "border-blue-500 bg-blue-100",
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          type="file"
          multiple
          hidden
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
        <p className="text-xl font-bold px-4 text-center">
          {dragging ? "Drop here" : "Drag and drop any image or zip files here"}
        </p>
      </div>
    </div>
  )
}

export default DragDropArea
