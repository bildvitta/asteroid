// https://stackoverflow.com/a/64167032/977687

export default function getSlotChildrenText (children) {
  return children.map(node => {
    if (!node.children || typeof node.children === 'string') {
      return node.children || ''
    } else if (Array.isArray(node.children)) {
      return getSlotChildrenText(node.children)
    } else if (node.children.default) {
      return getSlotChildrenText(node.children.default())
    }

    return undefined
  }).join('')
}
