export const useErrorImage = (imgUrls: string[]) => {
  return (e: Event) => {
    (e.target as HTMLImageElement).src = imgUrls[Math.floor(Math.random() * imgUrls.length)]
  }
}
