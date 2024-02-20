/**
 * Função para setar scroll uma determinada área (elemento) ao "puxar/agarrar" com o mouse/touch.
 * @param {HTMLElement} element
 * @param {Object} options
 * @param {Function} options.onMoveFn
 * @param {Function} options.onGrabFn
 * @returns {{element: HTMLElement, haveMoved: (function(): boolean), destroyEvents: (function())}}
 */
export default function (element, options = {}) {
  setModel()

  let isDown = false
  let moved = false
  let startX
  let scrollLeft

  addEvents()

  function addEvents () {
    addMouseEvents()
    addTouchEvents()
  }

  function destroyEvents () {
    removeMouseEvents()
    removeTouchEvents()
  }

  function addMouseEvents () {
    element.addEventListener('mousedown', onMouseEnter)
    element.addEventListener('mouseleave', onLeave)
    element.addEventListener('mouseup', onLeave)
    element.addEventListener('mousemove', onMouseMove)
  }

  function removeMouseEvents () {
    element.removeEventListener('mousedown', onMouseEnter)
    element.removeEventListener('mouseleave', onLeave)
    element.removeEventListener('mouseup', onLeave)
    element.removeEventListener('mousemove', onMouseMove)
  }

  function addTouchEvents () {
    element.addEventListener('touchstart', onEnter)
    element.addEventListener('touchend', onLeave)
    element.addEventListener('touchmove', onTouchMove)
  }

  function removeTouchEvents () {
    element.removeEventListener('touchstart', onEnter)
    element.removeEventListener('touchend', onLeave)
    element.removeEventListener('touchmove', onTouchMove)
  }

  function onEnter () {
    isDown = true
    moved = false

    element.classList.add('active')
  }

  function onLeave () {
    isDown = false

    element.classList.remove('active')

    setModel()
  }

  function onMouseEnter (event) {
    onEnter()

    startX = event.pageX - element.offsetLeft
    scrollLeft = element.scrollLeft
  }

  function onMouseMove (event) {
    if (event) event.preventDefault()

    if (!isDown) return

    setModel('grabbing')

    const x = event.pageX - element.offsetLeft
    const walk = (x - startX) * 3 // scroll-fast

    element.scrollLeft = scrollLeft - walk

    moved = true

    options.onMoveFn?.({ event, element })
  }

  function onTouchMove (event) {
    if (event.touches) event = event.touches[0]

    if (!isDown) return

    setModel('grabbing')

    moved = true

    options.onMoveFn?.({ event, element })
  }

  function setModel (model = 'grab') {
    element.style.cursor = model

    options.onGrabFn?.({ grabbing: model === 'grabbing' })
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
