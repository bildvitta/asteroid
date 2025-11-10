<template>
  <!--
    Itera sobre todos os componentes extraídos do slot
    Cada item pode estar em dois estados:
    1. Visível: Renderiza o componente real
    2. Não visível: Renderiza placeholder vazio (reserva espaço)
  -->
  <template
    v-for="(item, index) in items"
    :key="index"
  >
    <transition name="qas-lazy-fade">
      <!-- Componente real - renderizado quando visível -->
      <component
        :is="item"
        v-if="visibleItems.has(index)"
      />

      <!-- Placeholder - div vazia que reserva espaço no layout -->
      <div
        v-else
        :ref="element => setPlaceholderRef(element, index)"
        :style="{ height: placeholderHeight }"
      />
    </transition>
  </template>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, useSlots, nextTick } from 'vue'

defineOptions({ name: 'QasLazyLoadingComponent' })

const props = defineProps({
  // Porcentagem de visibilidade necessária para ativar (0.0 a 1.0)
  threshold: {
    type: Number,
    default: 0.1 // 10% visível
  },

  // Margem extra ao redor do viewport para pré-carregamento
  rootMargin: {
    type: String,
    default: '0px'
  },

  // Altura dos placeholders antes de carregar
  placeholderHeight: {
    type: String,
    default: '500px'
  }
})

const slots = useSlots()

/**
 * Lista de VNodes extraídos do slot default
 * Cada item é um VNode que representa um componente filho
 *
 * Exemplo:
 * <qas-lazy-loading-component>
 *   <ComponenteA /> <- items[0]
 *   <ComponenteB /> <- items[1]
 * </qas-lazy-loading-component>
 */
const items = ref([])

/**
 * Set de índices dos componentes que já foram renderizados
 * Quando um placeholder entra no viewport, seu índice é adicionado aqui
 * @type {Ref<Set<number>>}
 */
const visibleItems = ref(new Set())

/**
 * Map que armazena referências aos elementos placeholder
 * Chave: índice do componente
 * Valor: elemento DOM do placeholder
 * @type {Map<number, HTMLElement>}
 */
const placeholderRefs = new Map()

/**
 * Instância do IntersectionObserver
 * Responsável por detectar quando placeholders entram no viewport
 * @type {IntersectionObserver | null}
 */
let observer = null

// lifecycle hooks
onMounted(() => {
  setItems()

  // Aguarda Vue renderizar DOM e o navegador calcular layout antes de observar
  nextTick(() => requestAnimationFrame(createObserver))
})

onBeforeUnmount(() => {
  if (!observer) return

  // Limpa o observer para evitar memory leaks
  observer.disconnect()
})

// functions
/**
 * Cria e configura o IntersectionObserver
 * Observa todos os placeholders e renderiza componentes quando visíveis
 *
 * Fluxo:
 * 1. Cria observer com threshold e rootMargin configurados
 * 2. Quando placeholder entra no viewport:
 *    - Encontra o índice correspondente no Map
 *    - Adiciona índice ao visibleItems (renderiza componente)
 *    - Para de observar esse elemento
 * 3. Observa todos os placeholders armazenados no Map
 */
function createObserver () {
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return

        // Encontra o índice do placeholder no Map
        const index = Array.from(placeholderRefs.entries())
          .find(([_, element]) => element === entry.target)?.[0]

        if (index === undefined) return

        // Adiciona ao Set para renderizar o componente real
        visibleItems.value.add(index)

        // Para de observar - componente já foi renderizado
        observer.unobserve(entry.target)
      })
    },
    {
      threshold: props.threshold,
      rootMargin: props.rootMargin
    }
  )

  // Observa todos os placeholders do Map
  placeholderRefs.forEach(element => {
    observer.observe(element)
  })
}

/**
 * Extrai e achata os VNodes do slot default
 * Suporta múltiplos cenários:
 * - Componentes individuais: <ComponenteA /> <ComponenteB />
 * - v-for: <Component v-for="..." />
 * - template v-for: <template v-for="..."><Component /></template>
 *
 * @param {Array} vnodes - Array de VNodes
 * @returns {Array} Array de VNodes achatado
 */
function flattenVNodes (vnodes) {
  const flattened = []

  vnodes.forEach(vnode => {
    // Ignora VNodes vazios (comentários, whitespace)
    if (!vnode || typeof vnode !== 'object') return

    // Se for um Fragment (template v-for, etc), achata recursivamente
    if (vnode.type === Symbol.for('v-fgt') || vnode.type === Symbol.for('v-txt')) {
      if (Array.isArray(vnode.children)) {
        flattened.push(...flattenVNodes(vnode.children))
      }
    } else {
      // VNode normal (componente)
      flattened.push(vnode)
    }
  })

  return flattened
}

/**
 * Extrai os VNodes do slot default e armazena em items
 * Achata automaticamente fragments e v-for
 *
 * Exemplo de uso:
 * <qas-lazy-loading-component>
 *   <ComponenteA />  <- vnode 0
 *   <ComponenteB />  <- vnode 1
 *   <Component v-for="item in 10" /> <- vnode 2-11
 * </qas-lazy-loading-component>
 */
function setItems () {
  const slotContent = slots.default?.() || []
  const flattenedItems = flattenVNodes(slotContent)

  items.value = flattenedItems
}

/**
 * Armazena referência do elemento placeholder no Map
 * Chamado automaticamente pelo Vue através do :ref no template
 *
 * @param {HTMLElement | null} element - Elemento DOM do placeholder
 * @param {number} index - Índice do componente
 */
function setPlaceholderRef (element, index) {
  if (!element) return

  placeholderRefs.set(index, element)
}
</script>

<style scoped>
.qas-lazy-fade-enter-active {
  transition: opacity 0.6s ease;
}

.qas-lazy-fade-enter-from {
  opacity: 0;
}
</style>
