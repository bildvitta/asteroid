export default function (element) {
  setStyle()

  let isDown = false
  let startX
  let scrollLeft

  element.addEventListener('mousedown', onMouseDown)
  element.addEventListener('mouseleave', onMouseLeave)
  element.addEventListener('mouseup', onMouseUp)
  element.addEventListener('mousemove', onMouseMove)

  function onMouseDown (event) {
    isDown = true
    element.classList.add('active')
    startX = event.pageX - element.offsetLeft
    scrollLeft = element.scrollLeft
  }

  function onMouseLeave () {
    isDown = false
    element.classList.remove('active')

    setStyle()
  }

  function onMouseUp () {
    isDown = false
    element.classList.remove('active')

    setStyle()
  }

  function onMouseMove (event) {
    if (!isDown) return

    event.preventDefault()

    setStyle('grabbing')

    const x = event.pageX - element.offsetLeft
    const walk = (x - startX) * 3 // scroll-fast
    element.scrollLeft = scrollLeft - walk
  }

  function setStyle (model = 'grab') {
    element.style.cursor = model
  }

  function destroyEvents () {
    element.removeEventListener('mousedown', onMouseDown)
    element.removeEventListener('mouseleave', onMouseLeave)
    element.removeEventListener('mouseup', onMouseUp)
    element.removeEventListener('mousemove', onMouseMove)
  }

  return {
    element,
    destroyEvents
  }
}
