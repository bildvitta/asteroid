export default function setClickHandler (item = {}) {
  if (typeof item.handler === 'function') {
    const { handler, ...filtered } = item
    item.handler(filtered)
  }
}
