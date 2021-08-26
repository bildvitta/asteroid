function constructObject (name, object) {
  const response = {}

  for (const key in object) {
    const startsWith = key.startsWith(name)

    if (!startsWith) { continue }

    const nestedKey = key.replace(`${name}.`, '')
    const [index, field, next] = nestedKey.split('.')

    if (!response[index]) { response[index] = {} }

    if (next) {
      response[index][field] = constructObject(
        [name, index, field].join('.'), object
      )
    } else if (!field) {
      response[index] = object[key]
    } else {
      response[index][field] = object[key]
    }
  }

  return response
}

export default constructObject
