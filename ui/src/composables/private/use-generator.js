import { computed } from 'vue'
import { Spacing } from '../../enums/Spacing'
import { gutterValidator } from '../../helpers/private/gutter-validator'

const IRREGULAR_CLASSES = ['col', 'col-auto', 'fit']

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
    validator: gutterValidator
  },

  useCommonColumns: {
    type: Boolean
  }
}

/**
 * Composition para ser utilizada no QasGridGenerator e QasFormGenerator.
 *
 * @function
 * @name useGenerator
 * @param {Object} options - Opções do componente.
 * @param {baseProps} options.props - Propriedades do componente.
 * @returns {{
 *  classes: classes,
 *  getFieldClass: getFieldClass
 * }}
 */
export default function ({ props = {} }) {
  /**
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
   * @param {Object} options
   * @param {number} options.index - Index do campo.
   * @param {boolean} options.isGridGenerator - Indica se é um gerador de grid (QasGridGenerator).
   * @param {Object[string]} options.fields - Campos normalizados.
   * @returns {(string|string[])}
   */
  function getFieldClass ({ index, isGridGenerator, fields }) {
    if (typeof props.columns === 'string') {
      return IRREGULAR_CLASSES.includes(props.columns) ? props.columns : `col-${props.columns}`
    }

    return Array.isArray(props.columns)
      ? _handleColumnsByIndex({ index, isGridGenerator, fields })
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

      if (IRREGULAR_CLASSES.includes(value)) {
        classes.push(value === 'col' ? profiles[key] : value)
      } else {
        classes.push(`${profiles[key]}-${value}`)
      }
    }

    return [...classes, renamedClasses]
  }

  /**
   * @private
  */
  function _getDefaultColumnClass (isGridGenerator) {
    return isGridGenerator ? 'col-6 col-xs-12 col-sm-4' : 'col-6'
  }

  /**
   * @private
  */
  function _handleColumnsByField ({ index, isGridGenerator }) {
    /*
     * Quando é passado o columns como um único objeto que será replicado para todos fields.
     */
    if (props.useCommonColumns && Object.keys(props.columns).length) {
      return _getBreakpoint(props.columns)
    }

    /*
     * Quando não é passado columns, retornará o default.
     */
    if (!props.columns[index]) {
      return _getDefaultColumnClass(isGridGenerator)
    }

    /*
     * Quando é passado um objeto por field.
     */
    return _getBreakpoint(props.columns[index])
  }

  /**
   * @private
  */
  function _handleColumnsByIndex ({ index, isGridGenerator, fields }) {
    const normalizedFields = isGridGenerator ? props.fields : {}

    if (!isGridGenerator) {
      for (const key in fields) {
        Object.assign(normalizedFields, fields[key].fields.visible)
      }
    }

    if (!Array.isArray(normalizedFields)) {
      index = Object.keys(normalizedFields).findIndex(field => field === index)
    }

    const length = props.columns.length

    if (!length) {
      return _getDefaultColumnClass(isGridGenerator)
    }

    return _getBreakpoint(props.columns[index])
  }

  return {
    classes,

    getFieldClass
  }
}
