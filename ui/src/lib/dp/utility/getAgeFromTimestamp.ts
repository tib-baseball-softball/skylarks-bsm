export function getAgeFromTimestamp(timestamp: number): number {
  const birthDate = new Date(timestamp * 1000)
  const currentDate = new Date()

  let age = currentDate.getFullYear() - birthDate.getFullYear()

  // Adjust age if the current date is before the birthday this year
  const monthDifference = currentDate.getMonth() - birthDate.getMonth()
  const dayDifference = currentDate.getDate() - birthDate.getDate()

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--
  }

  return age
}
