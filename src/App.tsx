import { useEffect, useState } from "react"
import DragDropArea from "./DragDropArea"
import ImageViewer from "./ImageViewer"
import FileInfo from "./FileInfo"
import Footer from "./Footer"

function App() {
  const [files, setFiles] = useState<File[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showFileInfo, setShowFileInfo] = useState(false)

  const initialize = () => {
    setFiles([])
    setCurrentIndex(0)
    setShowFileInfo(false)
  }

  const goNext = () => {
    if (currentIndex < files.length - 1) {
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
      if (files.length > 0) {
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
  }, [files, currentIndex])

  if (files.length > 0 && currentIndex < files.length) {
    return (
      <>
        <ImageViewer file={files[currentIndex]} />
        {showFileInfo && <FileInfo fileName={files[currentIndex].name} />}
        <div
          className="fixed top-0 bottom-0 left-0 right-1/2 opacity-0"
          onClick={goPrevious}
        />
        <div
          className="fixed top-0 bottom-0 left-1/2 right-0 opacity-0"
          onClick={goNext}
        />
      </>
    )
  }

  return (
    <>
      <DragDropArea setFiles={setFiles} />
      <Footer />
    </>
  )
}

export default App
