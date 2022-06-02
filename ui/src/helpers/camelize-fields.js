import { camelize } from 'humps'

function camelizeFields (fields) {
  for (const field in fields) {
    const currentField = fields[field]

    currentField.name = camelize(currentField.name)

    if (Object.keys(currentField.children || {}).length) {
      camelizeFields(currentField.children)
    }
  }

  return fields
}

export {
  camelizeFields
}
