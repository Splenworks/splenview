import { useState } from "react"
import DragDropArea from "./DragDropArea"

function App() {
  const [files, setFiles] = useState<File[]>([])

  if (files.length > 0) {
    return (
      <div>
        <h1>Files dropped:</h1>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    )
  }

  return <DragDropArea setDroppedFiles={setFiles} />
}

export default App
