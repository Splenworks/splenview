import { useEffect, useState } from "react"
import DragDropArea from "./DragDropArea"
import ImageViewer from "./ImageViewer"

function App() {
  const [files, setFiles] = useState<File[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (files.length > 0) {
        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowDown" ||
          event.key === " "
        ) {
          if (currentIndex < files.length - 1) {
            setCurrentIndex((index) => index + 1)
          } else {
            setFiles([])
            setCurrentIndex(0)
          }
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          if (currentIndex > 0) {
            setCurrentIndex((index) => index - 1)
          } else {
            setFiles([])
            setCurrentIndex(0)
          }
        } else if (event.key === "Escape") {
          setFiles([])
          setCurrentIndex(0)
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [files, setFiles, currentIndex, setCurrentIndex])

  if (files.length > 0 && currentIndex < files.length) {
    return <ImageViewer file={files[currentIndex]} />
  }

  return <DragDropArea setDroppedFiles={setFiles} />
}

export default App
