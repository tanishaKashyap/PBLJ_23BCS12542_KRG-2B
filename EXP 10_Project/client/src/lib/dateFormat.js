export const dateFormat = (dateTimeString) => {
  if (!dateTimeString) return 'Unknown Date'

  const date = new Date(dateTimeString)

  // Get weekday, month, day
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' }) // Mon
  const month = date.toLocaleDateString('en-US', { month: 'long' })      // June
  const day = date.getDate()                                              // 30

  // Get hour and minute in 12-hour format
  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })

  return `${weekday}, ${month} ${day} at ${time}`
}
