export default function (element) {
  setStyle()

  let isDown = false
  let startX
  let scrollLeft

  element.addEventListener('mousedown', event => {
    isDown = true
    element.classList.add('active')
    startX = event.pageX - element.offsetLeft
    scrollLeft = element.scrollLeft
  })

  element.addEventListener('mouseleave', () => {
    isDown = false
    element.classList.remove('active')

    setStyle()
  })

  element.addEventListener('mouseup', () => {
    isDown = false
    element.classList.remove('active')

    setStyle()
  })

  element.addEventListener('mousemove', event => {
    if (!isDown) return

    event.preventDefault()

    setStyle('grabbing')

    const x = event.pageX - element.offsetLeft
    const walk = (x - startX) * 3 // scroll-fast
    element.scrollLeft = scrollLeft - walk
  })

  function setStyle (model = 'grab') {
    element.style.cursor = model
  }
}
