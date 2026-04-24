export function capitalize(string: string): string {
  let result = string.trim()
  result = result.charAt(0).toUpperCase() + result.slice(1)
  return result
}
