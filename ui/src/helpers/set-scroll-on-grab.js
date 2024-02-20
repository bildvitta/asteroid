/**
 * Função para setar scroll uma determinada área (elemento) ao "puxar/agarrar" com o mouse/touch.
 * @param {HTMLElement} element
 * @param {{ onMoveFn: function, onGrabFn: function }} options
 * @returns {{element: HTMLElement, destroyEvents: function }}
 */
export default function (element, options = {}) {
  setModel()

  let isDown = false
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
