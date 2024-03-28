import React, { useRef, useState } from "react"
import { twJoin } from "tailwind-merge"
import {
  getImageFiles,
  getImageFilesFromDataTransfer,
} from "./utils/getImageFiles"
import Spinner from "./Spinner"
import { FileList } from "./types/FileList"

interface DragDropAreaProps {
  setFileList: React.Dispatch<React.SetStateAction<FileList>>
}

const DragDropArea: React.FC<DragDropAreaProps> = ({ setFileList }) => {
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

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
    if (loading) return
    setLoading(true)
    const items = e.dataTransfer.items
    try {
      const imageFileList = await getImageFilesFromDataTransfer(items)
      setFileList(imageFileList)
    } catch (error) {
      alert(error)
      console.error(error)
      setFileList([])
    } finally {
      setLoading(false)
    }
  }

  const handleClick = () => {
    if (loading) return
    fileInputRef.current?.click()
  }

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || [])
    setLoading(true)
    try {
      const imageFileList = await getImageFiles(files)
      setFileList(imageFileList)
    } catch (error) {
      alert(error)
      console.error(error)
      setFileList([])
    } finally {
      setLoading(false)
    }
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
        {loading ? (
          <Spinner />
        ) : (
          <div className="px-4">
            {dragging ? (
              <p className="text-xl font-bold text-center">Drop here</p>
            ) : (
              <>
                <p className="mb-4 text-xl font-bold text-center">
                  Drag and drop any <u>images</u> here!
                </p>
                <p className="text-lg text-center">
                  You can even drop multiple <u>zip</u> files or <u>folders</u>.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DragDropArea
