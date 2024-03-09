export const sortFiles = (files: File[]): File[] => {
  return files.sort((a, b) => a.name.localeCompare(b.name))
}
