/**
 * Função que retorna se o elemento passado é filho do elemento especificado
 * pelo nome da classe.
 */
export default function (className, element) {
  while (element.parentElement) {
    const hasParentElement = element.parentElement.classList.contains(className)

    if (hasParentElement) return true

    element = element.parentElement
  }

  return false
}
