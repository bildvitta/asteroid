import { computed } from 'vue'

/**
 * @typedef {Object} BaseProps
 * @property {(string|Object|Array.<Object>)} columns - Colunas do formulário.
 * @property {Object} fields - Campos do formulário.
 * @property {(string|Boolean)} gutter - Espaçamento entre as colunas.
*/

/**
 * @typedef {Object} GetFieldClassParams
 * @property {number} index - Index do campo.
 * @property {boolean} isGridGenerator - Indica se é um gerador de grid (QasGridGenerator).
 * @property {Object[string]} normalizedFields - Campos normalizados.
*/

/**
* @callback GetFieldClass
* @param {GetFieldClassParams} options - parâmetros.
* @returns {(string|Object[]|string[])} A classe de coluna de acordo com o index.
*/

/**
* @callback GetDefaultColumnClass
* @param {boolean} isGridGenerator - Indica se é um gerador de grid (QasGridGenerator).
* @returns {string} A classe padrão de coluna.
*/

/**
 * @typedef {Object} Generator
 * @property {string} classes - Classes de colunas computadas.
 * @property {GetDefaultColumnClass} getDefaultColumnClass - Retorna a classe padrão de coluna.
 * @property {GetFieldClass} getFieldClass - Retorna a classe de coluna de acordo com o index.
*/

/**
 * @typedef {Object} UseGeneratorParams
 * @property {BaseProps} props - Propriedades do componente.
*/

/**
 * @callback UseGenerator
 * @param {UseGeneratorParams} props - Propriedades do componente.
 * @returns {Generator}
*/

// -----------------------------------------------------------------------------------------------------

const IRREGULAR_CLASSES = ['col', 'col-auto', 'fit']

/**
 * @constant
 * @type {BaseProps}
 */
export const baseProps = {
  columns: {
    default: () => [],
    type: [Array, String, Object]
  },

  fields: {
    default: () => ({}),
    type: Object
  },

  gutter: {
    default: 'lg',
    type: [String, Boolean],
    validator: value => {
      return typeof value === 'boolean' || ['xs', 'sm', 'md', 'lg', 'xl'].includes(value)
    }
  }
}

/**
 * @function
 * @type {UseGenerator}
 */
export default function ({ props = {} }) {
  const classes = computed(() => {
    const classesList = ['row']

    if (props.gutter) {
      classesList.push(`q-col-gutter-${props.gutter}`)
    }

    return classesList
  })

  /**
   * @type {GetDefaultColumnClass}
   */
  function getDefaultColumnClass (isGridGenerator) {
    return isGridGenerator ? 'col-6 col-xs-12 col-sm-4' : 'col-6'
  }

  /**
   * @type {GetFieldClass}
   */
  function getFieldClass ({ index, isGridGenerator, normalizedFields }) {
    if (typeof props.columns === 'string') {
      return IRREGULAR_CLASSES.includes(props.columns) ? props.columns : `col-${props.columns}`
    }

    return Array.isArray(props.columns)
      ? _handleColumnsByIndex({ index, isGridGenerator, normalizedFields })
      : _handleColumnsByField({ index, isGridGenerator })
  }

  /**
   * @private
  */
  function _getBreakpoint (columns) {
    const classes = []

    const profiles = {
      col: 'col',
      xs: 'col-xs',
      sm: 'col-sm',
      md: 'col-md',
      lg: 'col-lg',
      xl: 'col-xl'
    }

    const { fieldProps, classes: renamedClasses, ...formattedColumns } = columns || {}

    for (const key in formattedColumns) {
      const value = formattedColumns[key]

      classes.push(IRREGULAR_CLASSES.includes(value) ? value : `${profiles[key]}-${value}`)
    }

    return [...classes, renamedClasses]
  }

  /**
   * @private
   */
  function _handleColumnsByField ({ index, isGridGenerator }) {
    if (!props.columns[index]) {
      return getDefaultColumnClass(isGridGenerator)
    }

    return _getBreakpoint(props.columns[index])
  }

  /**
   * @private
   */
  function _handleColumnsByIndex ({ index, isGridGenerator, normalizedFields }) {
    const fields = isGridGenerator ? props.fields : {}

    if (!isGridGenerator) {
      for (const key in normalizedFields) {
        Object.assign(fields, normalizedFields[key].fields.visible)
      }
    }

    if (!Array.isArray(fields)) {
      index = Object.keys(fields).findIndex(field => field === index)
    }

    const length = props.columns.length

    if (!length) {
      return getDefaultColumnClass(isGridGenerator)
    }

    return _getBreakpoint(props.columns[index])
  }

  return {
    classes,

    getDefaultColumnClass,
    getFieldClass
  }
}
