module.exports = [
  {
    icon: 'room',
    name: 'Por que o Asteroid existe?',
    path: '/why-asteroid'
  },

  {
    icon: 'flight_takeoff',
    name: 'Começando',
    children: [
      {
        name: 'Usando',
        path: '/start/usage'
      },
      {
        name: 'Desenvolvendo',
        path: '/start/develop'
      },
      {
        name: 'Estrutura',
        path: '/start/structure'
      },
      {
        name: 'Guia de migração v2 -> v3',
        path: '/start/upgrade-guide'
      }
    ]
  },

  {
    icon: 'widgets',
    name: 'Componentes',

    children: [
      {
        name: 'Actions',
        path: '/components/actions'
      },
      {
        name: 'ActionsMenu',
        path: '/components/actions-menu'
      },
      {
        name: 'Alert',
        path: '/components/alert'
      },
      {
        name: 'AppBar',
        path: '/components/app-bar'
      },
      {
        name: 'AppMenu',
        path: '/components/app-menu'
      },
      {
        name: 'Avatar',
        path: '/components/avatar'
      },
      {
        name: 'Box',
        path: '/components/box'
      },
      {
        name: 'Breakline',
        path: '/components/breakline'
      },
      {
        name: 'Button',
        path: '/components/button'
      },
      {
        name: 'Card',
        path: '/components/card'
      },
      {
        name: 'CheckboxGroup',
        path: '/components/checkbox-group'
      },
      {
        name: 'Copy',
        path: '/components/copy'
      },
      {
        name: 'DateTimeInput',
        path: '/components/date-time-input'
      },
      {
        name: 'Debugger',
        path: '/components/debugger'
      },
      {
        name: 'Delete',
        path: '/components/delete'
      },
      {
        name: 'Dialog',
        path: '/components/dialog'
      },
      {
        name: 'DialogRouter',
        path: '/components/dialog-router'
      },
      {
        name: 'Field',
        path: '/components/field'
      },
      {
        name: 'Filters',
        path: '/components/filters'
      },
      {
        name: 'FormGenerator',
        path: '/components/form-generator'
      },
      {
        name: 'FormView',
        path: '/components/form-view'
      },
      {
        name: 'Gallery',
        path: '/components/gallery'
      },
      {
        name: 'GridGenerator',
        path: '/components/grid-generator'
      },
      {
        name: 'Input',
        path: '/components/input'
      },
      {
        name: 'Label',
        path: '/components/label'
      },
      {
        name: 'Layout',
        path: '/components/layout'
      },
      {
        name: 'ListItems',
        path: '/components/list-items'
      },
      {
        name: 'ListView',
        path: '/components/list-view'
      },
      {
        name: 'Map',
        path: '/components/map'
      },
      {
        name: 'NestedFields',
        path: '/components/nested-fields'
      },
      {
        name: 'NumericInput',
        path: '/components/numeric-input'
      },
      {
        name: 'PageHeader',
        path: '/components/page-header'
      },
      {
        name: 'PasswordInput',
        path: '/components/password-input'
      },
      {
        name: 'PasswordStrengthChecker',
        path: '/components/password-strength-checker'
      },
      {
        name: 'Profile',
        path: '/components/profile'
      },
      {
        name: 'Resizer',
        path: '/components/resizer'
      },
      {
        name: 'SearchBox',
        path: '/components/search-box'
      },
      {
        name: 'Select',
        path: '/components/select'
      },
      {
        name: 'SelectList',
        path: '/components/select-list'
      },
      {
        name: 'SignaturePad',
        path: '/components/signature-pad'
      },
      {
        name: 'SignatureUploader',
        path: '/components/signature-uploader'
      },
      {
        name: 'SingleView',
        path: '/components/single-view'
      },
      {
        name: 'Sortable',
        path: '/components/sortable'
      },
      {
        name: 'TableGenerator',
        path: '/components/table-generator'
      },
      {
        name: 'TabsGenerator',
        path: '/components/tabs-generator'
      },
      {
        name: 'TextTruncate',
        path: '/components/text-truncate'
      },
      {
        name: 'Transfer',
        path: '/components/transfer'
      },
      {
        name: 'Uploader',
        path: '/components/uploader'
      }
    ]
  },

  {
    icon: 'settings_input_hdmi',
    name: 'Plugins',
    children: [
      {
        name: 'Dialog',
        path: '/plugins/dialog'
      },
      {
        name: 'Logger',
        path: '/plugins/logger'
      },
      {
        name: 'NotifyError',
        path: '/plugins/notify-error'
      },
      {
        name: 'NotifySuccess',
        path: '/plugins/notify-success'
      },
      {
        name: 'Screen',
        path: '/plugins/screen'
      }
    ]
  },

  {
    icon: 'healing',
    name: 'Utilitários',
    children: [
      {
        name: 'AddCounterSuffix',
        path: '/helpers/add-counter-suffix'
      },
      {
        name: 'base64ToBlob',
        path: '/helpers/base-64-to-blob'
      },
      {
        name: 'camelizeFieldsName',
        path: '/helpers/camelize-fields-name'
      },
      {
        name: 'constructObject',
        path: '/helpers/construct-object'
      },
      {
        name: 'filterObject',
        path: '/helpers/filter-object'
      },
      {
        name: 'filters',
        path: '/helpers/filters'
      },
      {
        name: 'filterListByHandle',
        path: '/helpers/filter-list-by-handle'
      },
      {
        name: 'filterObjectToArray',
        path: '/helpers/filter-object-to-array'
      },
      {
        name: 'getSlotChildrenText',
        path: '/helpers/get-slot-children-text'
      },
      {
        name: 'getGreatestCommonDivisor',
        path: '/helpers/get-greatest-common-divisor'
      },
      {
        name: 'getNormalizedOptions',
        path: '/helpers/get-normalized-options'
      },
      {
        name: 'handleProcess',
        path: '/helpers/handle-process'
      },
      {
        name: 'images',
        path: '/helpers/images'
      },
      {
        name: 'isLocalDevelopment',
        path: '/helpers/is-local-development'
      },
      {
        name: 'setScrollOnGrab',
        path: '/helpers/set-scroll-on-grab'
      }
    ]
  },

  {
    icon: 'palette',
    name: 'Estilos',
    children: [
      {
        name: 'background',
        path: '/styles/background'
      },
      {
        name: 'border-radius',
        path: '/styles/border-radius'
      },
      {
        name: 'border',
        path: '/styles/border'
      },
      {
        name: 'container',
        path: '/styles/container'
      },
      {
        name: 'line-height',
        path: '/styles/line-height'
      },
      {
        name: 'opacity',
        path: '/styles/opacity'
      },
      {
        name: 'text',
        path: '/styles/text'
      },
      {
        name: 'set-brand',
        path: '/styles/set-brand'
      }
    ]
  },

  {
    icon: 'add_to_photos',
    name: 'Composição',
    children: [
      {
        name: 'useHistory',
        path: '/composables/use-history'
      }
    ]
  }
]
