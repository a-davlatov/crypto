export const useTimeDifference = (unixTime: number): string => {
  let dateOld: Date = new Date(unixTime)
  let dateNow: Date = new Date()
  const timeDifference = Math.abs((+dateNow) - (+dateOld))

  const minutesDifference = Math.floor(timeDifference / (60*1000))
  const hoursDifference = Math.floor(timeDifference / (60*60*1000))
  const daysDifference = Math.floor(timeDifference / (24*60*60*1000))

  if (daysDifference > 0) {
    return `${daysDifference} days ago`
  }
  if (hoursDifference > 0) {
    return `${hoursDifference} hours ago`
  }
  return `${minutesDifference} minutes ago`
}