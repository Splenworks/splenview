export const toggleFullScreen = () => {
  const imageViewerRef = document.getElementById("imageViewer")
  if (!imageViewerRef) return

  if (!document.fullscreenElement) {
    imageViewerRef.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`,
      )
    })
  } else {
    document.exitFullscreen()
  }
}
