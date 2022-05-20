export default function (call = () => {}) {
  const isDebugEnabled = true

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

  isDebugEnabled && call({
    group (msg, isError) {
      console.group(normalizeMessage(msg), getStyle(isError))
      return this
    },

    info (msg) {
      console.info(normalizeMessage(msg), getStyle())
      return this
    },

    table (payload) {
      console.table(payload)
      return this
    },

    error (msg) {
      console.error(msg)
      return this
    },

    end () {
      console.groupEnd()
      return this
    }
  })
}
