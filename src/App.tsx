import { useEffect, useState } from "react"
import DragDropArea from "./DragDropArea"
import ImageViewer from "./ImageViewer"
import FileInfo from "./FileInfo"
import Footer from "./Footer"
import { FileList } from "./types/FileList"
import Header from "./Header"

function App() {
  const [fileList, setFileList] = useState<FileList>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFileInfo, setShowFileInfo] = useState(false)

  const initialize = () => {
    setFileList([])
    setCurrentIndex(0)
    setShowFileInfo(false)
  }

  const goNext = () => {
    if (currentIndex < fileList.length - 1) {
      setCurrentIndex((index) => index + 1)
      setShowFileInfo(false)
    } else {
      alert("You have reached the end of the list.")
      initialize()
    }
  }

  const goPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((index) => index - 1)
      setShowFileInfo(false)
    }
  }

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
          setShowFileInfo((show) => !show)
        } else if (event.key === "Escape") {
          initialize()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [fileList, currentIndex])

  if (fileList.length > 0 && currentIndex < fileList.length) {
    return (
      <>
        <ImageViewer file={fileList[currentIndex].file} />
        {showFileInfo && (
          <FileInfo fileName={fileList[currentIndex].displayName} />
        )}
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
