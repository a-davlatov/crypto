export const useUcFirst = (str: string | undefined) :string | undefined => {
  if (!str) return str

  return str[0].toUpperCase() + str.slice(1)
}