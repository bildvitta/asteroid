import { camelize } from 'humps'

function camelizeFieldsName (fields) {
  for (const field in fields) {
    const currentField = fields[field]

    currentField.name = camelize(currentField.name)

    if (Object.keys(currentField.children || {}).length) {
      camelizeFieldsName(currentField.children)
    }
  }

  return fields
}

export default camelizeFieldsName
