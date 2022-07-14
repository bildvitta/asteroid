/**
 * param {options: object[], label: string, value: string} object
 *
 * @example getNormalizedOptions({
 *  options: [{ name: 'Test 1', uuid: '1' }, { name: 'Test 2', uuid: '2' }],
 *  label: 'name'
 *  value: 'uuid'
 * }) // retorna [{ label: 'Test 1', value: '1' }, { label: 'Test 2', value: '2' }]
 */
export default ({ options = [], label, value }) => {
  return options.map(option => {
    const { [label]: labelKey, [value]: valueKey, ...payload } = option

    return {
      label: option[label],
      value: option[value],
      ...payload
    }
  })
}
