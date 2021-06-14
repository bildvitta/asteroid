export default function (base64) {
  // extract content type and base64 payload from original string
  const positionString = base64.indexOf(';base64,')
  const type = base64.substring(5, positionString)
  const contentBase64 = base64.substr(positionString + 8)

  // decode base64
  const imageContent = atob(contentBase64)

  // create an ArrayBuffer and a view (as unsigned 8-bit)
  const buffer = new ArrayBuffer(imageContent.length)
  const view = new Uint8Array(buffer)

  // fill the view, using the decoded base64
  for (let position = 0; position < imageContent.length; position++) {
    view[position] = imageContent.charCodeAt(position)
  }

  // convert ArrayBuffer to Blob
  const blob = new Blob([buffer], { type })

  return blob
}
