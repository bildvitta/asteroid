import { onMounted, isRef, ref, nextTick, onBeforeUnmount } from 'vue'
import { uid } from 'quasar'

export default function useScrollGradient (config = {}) {
  const { element: containerElement, styles } = config

  const { color = '#FFFFFF', size = '40px' } = styles || {}

  const { r, g, b } = hexToRgb(color)
  const rgbParam = `${r}, ${g}, ${b}`

  const uuid = ref('')
  const resizeObserver = ref(null)
  // const uuid = uid()

  // refs
  // const scrollConfig = ref({
  //   hasScroll: false,
  //   isScrollAtBottom: false,
  //   isScrollAtTop: false
  // })

  onMounted(initializeScrollGradient)
  onBeforeUnmount(remove)

  async function initializeScrollGradient () {
    await nextTick()
    remove()

    const element = getElement()

    uuid.value = uid()

    createSpan('top')
    createSpan('bottom')

    const hasBottomScroll = element.scrollHeight > element.clientHeight

    if (hasBottomScroll) toggleSpan('bottom', true)

    element.addEventListener('scroll', toggleSpanByScrollPosition)
    setResizeObserver()
  }

  function remove () {
    if (!uuid.value) return

    const element = getElement()

    element.removeEventListener('scroll', toggleSpanByScrollPosition)

    resizeObserver.value?.unobserve(element)

    // remove scroll gradient spans
    const scrollSpanTop = document.getElementById(`scroll-gradient-top-${uuid.value}`)
    const scrollSpanBottom = document.getElementById(`scroll-gradient-bottom-${uuid.value}`)

    if (scrollSpanTop) scrollSpanTop.remove()
    if (scrollSpanBottom) scrollSpanBottom.remove()
  }

  function toggleSpan (direction, show) {
    const scrollSpan = getSpan(direction)

    scrollSpan.style.display = show ? 'block' : 'none'
  }

  function getSpan (direction) {
    return document.getElementById(`scroll-gradient-${direction}-${uuid.value}`)
  }

  function createSpan (direction) {
    const element = getElement()
    const span = document.createElement('span')

    // styles
    Object.assign(span.style, {
      pointerEvents: 'none',
      height: size,
      display: 'none',
      position: 'absolute',
      width: '100%',
      zIndex: 1,
      backgroundImage: `linear-gradient(to ${direction}, rgba(${rgbParam}, 0) 0%, rgba(${rgbParam}, 0.9) 51%, rgb(${rgbParam}) 75%)`
    })

    // Atributos
    span.setAttribute('id', `scroll-gradient-${direction}-${uuid.value}`)
    span.setAttribute('role', 'presentation') // remove semântica
    span.setAttribute('tabindex', '-1') // remove do foco
    span.setAttribute('aria-hidden', 'true') // remove do leitor de tela

    // adiciona span como irmão do elemento acima (top )ou abaixo dele (bottom)
    element.parentNode.insertBefore(span, direction === 'top' ? element.previousSibling : element.nextSibling)

    // seta posição após inserir o elemento no DOM
    setSpanPosition(direction)
  }

  function getDistanceFromParent () {
    const element = getElement()

    const elementRect = element.getBoundingClientRect()
    const parentRect = element.parentElement.getBoundingClientRect()

    // Diferença entre o bottom do pai e o bottom do filho
    // Um valor positivo significa que há espaço livre abaixo do filho
    const bottomDistance = parentRect.bottom - elementRect.bottom
    const topDistance = elementRect.top - parentRect.top

    return {
      bottom: bottomDistance,
      top: topDistance
    }
  }

  function setSpanPosition (direction) {
    const span = getSpan(direction)

    const position = getDistanceFromParent()[direction]

    span.style[direction] = `${position}px`
  }

  function toggleSpanByScrollPosition () {
    const { scrollTop, scrollHeight, clientHeight } = getElement()

    // Pequena tolerância para lidar com problemas de precisão de ponto flutuante
    const tolerance = 1

    const isScrollAtTop = scrollTop === 0
    const isScrollAtBottom = scrollTop + clientHeight >= scrollHeight - tolerance

    toggleSpan('top', !isScrollAtTop)
    toggleSpan('bottom', !isScrollAtBottom)
  }

  function setResizeObserver () {
    const element = getElement()

    let previousHeight = element.offsetHeight

    resizeObserver.value = new ResizeObserver(entries => {
      entries.forEach(entry => {
        // obtém o elemento que foi redimensionado
        const entryElement = entry.target

        // obtém a nova altura
        const currentHeight = entryElement.offsetHeight

        // verifica se a altura realmente mudou
        if (currentHeight !== previousHeight) {
          // atualiza posição do gradient
          setSpanPosition('bottom')
          setSpanPosition('top')

          // controla se deve ou não mostrar o gradient
          toggleSpanByScrollPosition()

          previousHeight = currentHeight
        }
      })
    })

    resizeObserver.value.observe(element)
  }

  function getElement () {
    return isRef(containerElement) ? containerElement.value.$el : containerElement
  }

  return {
    initializeScrollGradient
  }
}

function hexToRgb (hex) {
  // Remove o '#' se existir
  let cleanHex = hex.startsWith('#') ? hex.slice(1) : hex

  // Se for o formato curto, expande para 6 dígitos
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(c => c + c).join('')
  }

  // Converte o hexadecimal para inteiro
  const bigint = parseInt(cleanHex, 16)

  // Extrai os valores de r, g, b
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return { r, g, b }
}
