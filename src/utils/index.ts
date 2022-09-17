export function UUID() {
  return Math.random().toString(16).substring(2).toUpperCase()
}
