import { computed } from 'vue'

const IRREGULAR_CLASSES = ['col', 'col-auto', 'fit']

/**
 * @typedef {Object} BaseProps
 * @property {(Array|String|Object)} columns - Colunas do formulário.
 * @property {Object} fields - Campos do formulário.
 * @property {(String|Boolean)} gutter - Espaçamento entre as colunas.
*/

/**
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
 * @typedef {Object} Generator
 * @property {string} classes - Classes de colunas computadas.
 * @property {function} getDefaultColumnClass - Retorna a classe padrão de coluna.
 * @property {function} getFieldClass - Retorna a classe de coluna de acordo com o index.
 */

/**
 * @param {Object} params - Propriedades do componente.
 * @param {BaseProps} params.props - Propriedades do componente.
 * @returns {Generator}
 */
export default function useGenerator ({ props = {} }) {
  // computed
  const classes = computed(() => {
    const classesList = ['row']

    if (props.gutter) {
      classesList.push(`q-col-gutter-${props.gutter}`)
    }

    return classesList
  })

  /**
   * Retorna a classe padrão de coluna.
   * @param {boolean} isGridGenerator - Indica se é um gerador de grid (QasGridGenerator).
   * @returns {string} A classe padrão de coluna.
   */
  function getDefaultColumnClass (isGridGenerator) {
    return isGridGenerator ? 'col-6 col-xs-12 col-sm-4' : 'col-6'
  }

  /**
   * Retorna a classe de coluna de acordo com o index.
   * @param {Object} params - parâmetros.
   * @param {number} params.index - Index do campo.
   * @param {boolean} params.isGridGenerator - Indica se é um gerador de grid (QasGridGenerator).
   * @param {Object[string]} params.normalizedFields - Campos normalizados.
   * @returns {(string|Object[]|string[])} A classe de coluna de acordo com o index.
   */
  function getFieldClass ({ index, isGridGenerator, normalizedFields }) {
    if (typeof props.columns === 'string') {
      return IRREGULAR_CLASSES.includes(props.columns) ? props.columns : `col-${props.columns}`
    }

    return Array.isArray(props.columns)
      ? _handleColumnsByIndex({ index, isGridGenerator, normalizedFields })
      : _handleColumnsByField({ index, isGridGenerator })
  }

  // privates
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

  function _handleColumnsByField ({ index, isGridGenerator }) {
    if (!props.columns[index]) {
      return getDefaultColumnClass(isGridGenerator)
    }

    return _getBreakpoint(props.columns[index])
  }

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
