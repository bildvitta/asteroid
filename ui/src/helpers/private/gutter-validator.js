import { Spacing } from '../../enums/Spacing'

// TODO: validar a necessidade da prop ser boolean
/**
 * Valida se o gutter passado respeita os valores do enum Spacing ou é um boolean.
 *
 * @function
 * @param {(string|boolean)} value
 * @returns {boolean}
 */
export function gutterValidator (value) {
  const availableSpacings = Object.values(Spacing)

  return typeof value === 'boolean' || availableSpacings.includes(value)
}
