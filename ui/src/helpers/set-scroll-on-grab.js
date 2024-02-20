/**
 * Função para setar scroll uma determinada área (elemento) ao "puxar/agarrar" com o mouse/touch.
 * @param {HTMLElement} element
 * @param {{ onGrabFn: function, onMoveFn: function, onScrollFn: function }} options
 * @returns {{element: HTMLElement, destroyEvents: function }}
 */
export default function (element, options = {}) {
  setModel()

  let isDown = false
  let startX
  let scrollLeft

  const events = {
    mousedown: onMouseEnter,
    mouseleave: onLeave,
    mousemove: onMouseMove,
    mouseup: onLeave,
    scroll: options.onScrollFn,
    touchend: onLeave,
    touchmove: onTouchMove,
    touchstart: onEnter
  }

  addEvents()

  function addEvents () {
    Object.entries(events).forEach(([event, fn]) => {
      element.addEventListener(event, fn)
    })
  }

  function destroyEvents () {
    Object.entries(events).forEach(([event, fn]) => {
      element.removeEventListener(event, fn)
    })
  }

  function onEnter () {
    isDown = true

    element.classList.add('active')
  }

  function onMouseEnter (event) {
    onEnter()

    startX = event.pageX - element.offsetLeft
    scrollLeft = element.scrollLeft
  }

  function onLeave () {
    isDown = false

    element.classList.remove('active')

    setModel()
  }

  function onMouseMove (event) {
    if (event) event.preventDefault()

    if (!isDown) return

    setModel('grabbing')

    const x = event.pageX - element.offsetLeft
    const walk = (x - startX) * 3 // scroll-fast

    element.scrollLeft = scrollLeft - walk

    options.onMoveFn?.({ event, element })
  }

  function onTouchMove (event) {
    event = event.touches[0]

    if (!isDown) return

    setModel('grabbing')

    options.onMoveFn?.({ event, element })
  }

  function setModel (model = 'grab') {
    setStyles(model)

    options.onGrabFn?.({ isGrabbing: model === 'grabbing' })
  }

  function setStyles (model = 'grab') {
    const isGrabbing = model === 'grabbing'

    element.style.cursor = model

    Array.from(element.children).forEach(child => {
      child.classList.toggle('no-pointer-events', isGrabbing)
      child.classList.toggle('non-selectable', isGrabbing)
    })
  }

  return {
    element,
    destroyEvents
  }
}
