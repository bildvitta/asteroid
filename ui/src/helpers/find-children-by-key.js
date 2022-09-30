export default (nested = [], key, value) => {
  let response = null

  nested.some(function findNodes (item) {
    if (item[key] === value) {
      response = item
      return true
    }

    return Array.isArray(item.children) && item.children.some(findNodes)
  })

  return response
}
