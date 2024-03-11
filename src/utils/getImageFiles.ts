import { unzip } from "unzipit"
import { getAllFileEntries } from "./getFromDirectory"

const looksLikeImage = (fileName: string) => {
  if (fileName.startsWith("__MACOSX")) return false
  return (
    fileName.endsWith(".jpg") ||
    fileName.endsWith(".jpeg") ||
    fileName.endsWith(".png") ||
    fileName.endsWith(".gif") ||
    fileName.endsWith(".webp")
  )
}

const looksLikeZip = (fileName: string) => {
  if (fileName.startsWith("__MACOSX")) return false
  return fileName.endsWith(".zip")
}

const unzipFile = async (file: File) => {
  if (file.name.endsWith(".zip")) {
    const { entries } = await unzip(file)
    const names = Object.keys(entries).filter(
      (entry) => looksLikeZip(entry) || looksLikeImage(entry),
    )
    const blobs = await Promise.all(
      names.map((name) =>
        looksLikeImage(name)
          ? entries[name].blob("image/*")
          : entries[name].blob("application/zip"),
      ),
    )
    const files = blobs
      .map((blob, index) => new File([blob], names[index], { type: blob.type }))
      .sort((a, b) => a.name.localeCompare(b.name))
    const unzippedFiles: Array<File> = []
    for await (const file of files) {
      if (file.name.endsWith(".zip")) {
        const newFiles = await unzipFile(file)
        unzippedFiles.push(...newFiles)
      } else {
        unzippedFiles.push(file)
      }
    }
    return unzippedFiles
  }
  return []
}

export const getImageFiles = async (files: File[]) => {
  const sortedFiles = files
    .filter(
      (file) => file.type.startsWith("image/") || file.name.endsWith(".zip"),
    )
    .sort((a, b) => a.name.localeCompare(b.name))
  const unzippedFiles: Array<File> = []
  for await (const file of sortedFiles) {
    if (file.name.endsWith(".zip")) {
      const newFiles = await unzipFile(file)
      unzippedFiles.push(...newFiles)
    } else {
      unzippedFiles.push(file)
    }
  }
  return unzippedFiles
}

export const getImageFilesFromDataTransfer = async (
  items: DataTransferItemList,
) => {
  const entries = await getAllFileEntries(items)
  const fileEntries = entries.filter((entry) => entry.isFile)
  const files = await Promise.all(
    (fileEntries as FileSystemFileEntry[]).map(async (entry) => {
      const file = await new Promise<File>((resolve, reject) => {
        entry.file(resolve, reject)
      })
      return file
    }),
  )
  return getImageFiles(files)
}
