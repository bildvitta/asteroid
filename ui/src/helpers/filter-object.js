/**
 * Function to filter specific field inside a fields
 *
 * @param {object} fields object of fields
 * @param {array} models array of model that you filter
 * @throws {Error} Argument models must be an array of model
 * @returns {object} filtered object
 *
 * @example
 * filterObject({
 *  name: { label: 'Nome', value: 1 },
 *  email: { label: 'E-mail', value: 2 }
 * }, ['name'])
 */
export default function (fields = {}, models) {
  if (!models.length) {
    throw new Error('Please provide an array of model')
  }

  if (!Object.keys(fields).length) {
    return {}
  }

  const object = {}

  models.forEach(model => {
    if (fields[model]) {
      object[model] = fields[model]
    }
  })

  return object
}
