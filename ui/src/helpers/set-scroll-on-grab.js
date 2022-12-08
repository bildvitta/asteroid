export default function (element) {
  setStyle()

  let isDown = false
  let moved = false
  let startX
  let scrollLeft

  element.addEventListener('mousedown', onMouseDown)
  element.addEventListener('mouseleave', onMouseLeave)
  element.addEventListener('mouseup', onMouseUp)
  element.addEventListener('mousemove', onMouseMove)

  function onMouseDown (event) {
    isDown = true
    moved = false

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
    if (event) event.preventDefault()
    if (!isDown) return

    setStyle('grabbing')

    const x = event.pageX - element.offsetLeft
    const walk = (x - startX) * 3 // scroll-fast
    element.scrollLeft = scrollLeft - walk
    moved = true
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

  function haveMoved () {
    return moved
  }

  return {
    element,
    haveMoved,
    destroyEvents
  }
}
