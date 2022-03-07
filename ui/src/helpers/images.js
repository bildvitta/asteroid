function getImageSize (image) {
  return new Promise((resolve, reject) => {
    image.addEventListener('load', () => {
      resolve({ width: image.naturalWidth, height: image.naturalHeight })
    })

    image.addEventListener('error', reject)
  })
}

function getResizeDimensions (sizeLimit, width, height) {
  const factor = sizeLimit / Math.max(width, height)

  if (factor < 1) {
    width *= factor
    height *= factor
  }

  return {
    width: Math.round(width),
    height: Math.round(height)
  }
}

export {
  getImageSize,
  getResizeDimensions
}
