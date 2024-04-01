import { useEffect, useMemo, useState } from "react"
import DragDropArea from "./DragDropArea"
import ImageViewer from "./ImageViewer"
import FileInfo from "./FileInfo"
import Footer from "./Footer"
import { FileList } from "./types/FileList"
import Header from "./Header"
import { hashCode } from "./utils/hashCode"
import { parseJsonObj } from "./utils/parseJsonObj"

const currentIndexes = parseJsonObj(localStorage.getItem("currentIndexes"))

function App() {
  const [fileList, setFileList] = useState<FileList>([])
  const [currentIndex, setCurrentIndex] = useState(-1)
  const [infoMode, setInfoMode] = useState(false)
  const [readyToExit, setReadyToExit] = useState(false)

  const initialize = () => {
    setFileList([])
    setCurrentIndex(-1)
    setInfoMode(false)
    setReadyToExit(false)
  }

  const goNext = () => {
    if (currentIndex < fileList.length - 1) {
      setCurrentIndex((index) => index + 1)
      setInfoMode(false)
      setReadyToExit(false)
    } else if (!readyToExit) {
      alert("You have reached the end of the list.")
      setReadyToExit(true)
    } else {
      initialize()
    }
  }

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1)
      setInfoMode(false)
      setReadyToExit(false)
    } else if (!readyToExit) {
      alert("You have reached the beginning of the list.")
      setReadyToExit(true)
    } else {
      initialize()
    }
  }

  const hash = useMemo(
    () =>
      hashCode(
        fileList.map((item) => item.displayName + item.file.size).join(""),
      ),
    [fileList],
  )

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (fileList.length > 0) {
        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowDown" ||
          event.key === " "
        ) {
          goNext()
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          goPrevious()
        } else if (event.key === "Tab") {
          event.preventDefault()
          setInfoMode((mode) => !mode)
        } else if (event.key === "Escape") {
          initialize()
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [fileList, currentIndex, readyToExit])

  useEffect(() => {
    if (fileList.length === 0) return
    const hashedCurrentIndex = currentIndexes[hash]
    if (
      hashedCurrentIndex &&
      typeof hashedCurrentIndex === "number" &&
      hashedCurrentIndex <= fileList.length - 2
    ) {
      setCurrentIndex(hashedCurrentIndex)
    } else {
      setCurrentIndex(0)
    }
  }, [fileList])

  useEffect(() => {
    if (currentIndex === -1) return
    if (currentIndex === 0 && !currentIndexes[hash]) return
    currentIndexes[hash] = currentIndex
    localStorage.setItem("currentIndexes", JSON.stringify(currentIndexes))
  }, [currentIndex])

  if (
    fileList.length > 0 &&
    currentIndex < fileList.length &&
    currentIndex >= 0
  ) {
    return (
      <>
        <ImageViewer file={fileList[currentIndex].file} />
        {infoMode && <FileInfo fileName={fileList[currentIndex].displayName} />}
        <div
          className="fixed top-0 bottom-0 left-0 right-1/2 opacity-0"
          onTouchStart={goPrevious}
        />
        <div
          className="fixed top-0 bottom-0 left-1/2 right-0 opacity-0"
          onTouchStart={goNext}
        />
      </>
    )
  }

  return (
    <>
      <Header />
      <DragDropArea setFileList={setFileList} />
      <Footer />
    </>
  )
}

export default App
