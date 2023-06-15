import { computed } from 'vue'
import { Spacing } from '../../enums/Spacing'

const IRREGULAR_CLASSES = ['col', 'col-auto', 'fit']

/**
 * @constant
 * @type {{
 *  columns: (string|Object|Array.<Object>),
 *  fields: Object,
 *  gutter: (string|Boolean)
 * }}
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
    default: Spacing.Lg,
    type: [String, Boolean],
    validator: value => {
      const availableSpacings = Object.values(Spacing)

      return typeof value === 'boolean' || availableSpacings.includes(value)
    }
  }
}

/**
 * Composition para ser utilizada no QasGridGenerator e QasFormGenerator.
 *
 * @function
 * @param {Object} options - Opções do componente.
 * @param {baseProps} options.props - Propriedades do componente.
 * @returns {{
 *  classes: classes,
 *  getDefaultColumnClass: getDefaultColumnClass,
 *  getFieldClass: getFieldClass
 * }}
 */
export default function ({ props = {} }) {
  /**
   * @constant
   * @memberof useGenerator
   * @type {{ value: string[] | string }}
   */
  const classes = computed(() => {
    const classesList = ['row']

    if (props.gutter) {
      classesList.push(`q-col-gutter-${props.gutter}`)
    }

    return classesList
  })

  /**
   * @function
   * @memberof useGenerator
   * @param {string} isGridGenerator - Indica se é um gerador de grid (QasGridGenerator).
   * @returns {"col-6 col-xs-12 col-sm-4" | "col-6"}
   */
  function getDefaultColumnClass (isGridGenerator) {
    return isGridGenerator ? 'col-6 col-xs-12 col-sm-4' : 'col-6'
  }

  /**
   * @function
   * @memberof useGenerator
   * @param {Object} options
   * @param {number} options.index - Index do campo.
   * @param {boolean} options.isGridGenerator - Indica se é um gerador de grid (QasGridGenerator).
   * @param {Object[string]} options.normalizedFields - Campos normalizados.
   * @returns {(string|string[])}
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
