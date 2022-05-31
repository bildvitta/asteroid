export default () => {
  const isDebugEnabled = process.env.DEBUGGING

  const normalizeMessage = msg => `%c ${msg}`
  const getStyle = isError => (
    `
      background: ${isError ? '#C10015 ' : '#1976d2'};
      font-weight: bold;
      color: white;
      padding: 6px 20px;
      border-radius: 4px;
      display: block;
      width: 100%;
      font-size: 12px;
    `
  )

  return {
    group (message, payload = [], isErrorType) {
      if (!isDebugEnabled) return

      console.group(normalizeMessage(message), getStyle(isErrorType))

      for (const item of payload) {
        if (typeof item === 'string' && isErrorType) {
          console.info(normalizeMessage(message), getStyle(true))
          continue
        }

        if (typeof item === 'string') {
          console.info(normalizeMessage(item), getStyle())
          continue
        }

        console.table(item)
      }

      console.groupEnd()
    },

    info (message) {
      isDebugEnabled && console.info(normalizeMessage(message), getStyle())
    },

    error (message) {
      isDebugEnabled && console.info(normalizeMessage(message), getStyle(true))
    }
  }
}
