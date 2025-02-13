import { Spacing } from '../../enums/Spacing'
import { gutterValidator } from '../../helpers/private/gutter-validator'
import useScreen from '../use-screen'

import { computed } from 'vue'

const IRREGULAR_CLASSES = ['col', 'col-auto', 'fit']

export const baseProps = {
  columns: {
    default: () => [],
    type: [Array, String, Object]
  },

  commonColumns: {
    default: () => ({}),
    type: [Object, String]
  },

  fields: {
    default: () => ({}),
    type: Object
  },

  gutter: {
    default: undefined,
    type: [String, Boolean],
    validator: gutterValidator
  }
}

/**
 * Composition para ser utilizada no QasGridGenerator e QasFormGenerator.
 *
 * @function
 * @name useGenerator
 * @param {Object} options - Opções do componente.
 * @param {baseProps} options.props - Propriedades do componente.
 * @param {boolean} options.isGrid - Propriedades do componente.
 * @returns {{
 *  classes: classes,
 *  getFieldClass: getFieldClass
 * }}
 */
export default function ({ props = {}, isGrid = false }) {
  const screen = useScreen()

  const defaultGutter = computed(() => {
    if (props.gutter !== undefined) return props.gutter

    return (props.useInline && !screen.isSmall) && isGrid ? Spacing.Sm : Spacing.Md
  })

  /**
   * @type {{ value: string[] | string }}
   */
  const classes = computed(() => {
    const classesList = ['row']

    if (defaultGutter.value) {
      classesList.push(`q-col-gutter-${defaultGutter.value}`)
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
    if (typeof props.columns === 'string') return _getStringColumns(props.columns)

    return Array.isArray(props.columns)
      ? _handleColumnsByIndex({ index, isGridGenerator, fields })
      : _handleColumnsByField({ index, isGridGenerator })
  }

  function getFieldSetColumnClass (column) {
    if (!column) return 'col-12'

    return typeof column === 'string' ? _getStringColumns(column) : _getBreakpoint(column)
  }

  /**
   * @private
   */
  function _getStringColumns (columns) {
    return IRREGULAR_CLASSES.includes(columns) ? columns : `col-${columns}`
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
    if (typeof props.commonColumns === 'string') return _getStringColumns(props.commonColumns)

    if (Object.keys(props.commonColumns).length) return _getBreakpoint(props.commonColumns)

    return isGridGenerator ? 'col-6 col-xs-12 col-sm-4' : 'col-6'
  }

  /**
   * @private
  */
  function _handleColumnsByField ({ index, isGridGenerator }) {
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

    getFieldClass,
    getFieldSetColumnClass
  }
}
