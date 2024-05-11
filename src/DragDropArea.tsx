import React, { useRef, useState } from "react"
import { twJoin } from "tailwind-merge"
import {
  getImageFiles,
  getImageFilesFromDataTransfer,
} from "./utils/getImageFiles"
import Spinner from "./Spinner"
import { FileList } from "./types/FileList"
import { PhotoIcon } from "@heroicons/react/24/solid"
import { Trans, useTranslation } from "react-i18next"

interface DragDropAreaProps {
  setFileList: React.Dispatch<React.SetStateAction<FileList>>
}

const DragDropArea: React.FC<DragDropAreaProps> = ({ setFileList }) => {
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()

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
      if (imageFileList.length === 0)
        throw new Error(t("dragDropArea.noImageFilesFound"))
      setFileList(imageFileList)
    } catch (error) {
      alert(error instanceof Error ? error.message : error)
      console.error(error)
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
      if (imageFileList.length === 0)
        throw new Error(t("dragDropArea.noImageFilesFound"))
      setFileList(imageFileList)
    } catch (error) {
      alert(error instanceof Error ? error.message : error)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed top-16 left-0 right-0 bottom-16 bg-white dark:bg-neutral-900">
      <div
        className={twJoin(
          "absolute inset-x-8 md:inset-x-16 inset-y-0 rounded-xl border-dashed border-4 border-gray-300 cursor-pointer flex items-center justify-center transition-colors duration-300 ease-in-out",
          (dragging || loading) &&
            "bg-neutral-200 dark:bg-neutral-600 border-pink-900 dark:border-pink-700",
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
          accept="image/*, .zip"
          hidden
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
        {loading ? (
          <Spinner />
        ) : (
          <div className="px-4 pb-12 text-black dark:text-white pointer-events-none">
            {dragging ? (
              <p className="text-xl font-bold text-center text-gray-50 dark:text-white shadow-gray-600 dark:shadow-black [text-shadow:_0_5px_5px_var(--tw-shadow-color,0.5)]">
                <Trans i18nKey="dragDropArea.dropHere" />
              </p>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <PhotoIcon className="mb-8 w-24 h-24 text-pink-900 dark:text-pink-700" />
                <p className="mb-4 text-xl text-center font-bold">
                  <Trans
                    i18nKey="dragDropArea.mainMessage"
                    components={{
                      u: <span className="text-pink-900 dark:text-pink-700" />,
                    }}
                  />
                </p>
                <p className="mb-4 text-lg text-center font-semibold">
                  <Trans
                    i18nKey="dragDropArea.subMessage"
                    components={{
                      u: <span className="text-pink-900 dark:text-pink-700" />,
                    }}
                  />
                </p>
                <p className="text-center">
                  <Trans i18nKey="dragDropArea.neverStoreYourData" />
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default DragDropArea
