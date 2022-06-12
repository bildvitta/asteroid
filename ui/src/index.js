import { version } from '../package.json'

import QasActionsMenu from './components/actions-menu/QasActionsMenu'
import QasAppBar from './components/app-bar/QasAppBar'
import QasAppMenu from './components/app-menu/QasAppMenu'
import QasAppsMenu from './components/apps-menu/QasAppsMenu'
import QasAvatar from './components/avatar/QasAvatar'
import QasBox from './components/box/QasBox'
import QasBreakLine from './components/break-line/QasBreakLine'
import QasBtn from './components/btn/QasBtn'
import QasBtnActions from './components/btn-actions/QasBtnActions'
import QasCard from './components/card/QasCard'
import QasCheckboxGroup from './components/checkbox-group/QasCheckboxGroup'
import QasCopy from './components/copy/QasCopy'
import QasDateTimeInput from './components/date-time-input/QasDateTimeInput'
import QasDebugger from './components/debugger/QasDebugger'
import QasDelete from './components/delete/QasDelete'
import QasDialog from './components/dialog/QasDialog'
import QasDialogRouter from './components/dialog-router/QasDialogRouter'
import QasField from './components/field/QasField'
import QasFilters from './components/filters/QasFilters'
import QasFormGenerator from './components/form-generator/QasFormGenerator'
import QasFormView from './components/form-view/QasFormView'
import QasGallery from './components/gallery/QasGallery'
import QasGridGenerator from './components/grid-generator/QasGridGenerator'
import QasInput from './components/input/QasInput'
import QasLabel from './components/label/QasLabel'
import QasLayout from './components/layout/QasLayout'
import QasListItems from './components/list-items/QasListItems'
import QasListView from './components/list-view/QasListView'
import QasMap from './components/map/QasMap'
import QasNestedFields from './components/nested-fields/QasNestedFields'
import QasNumericInput from './components/numeric-input/QasNumericInput'
import QasPageHeader from './components/page-header/QasPageHeader'
import QasPasswordInput from './components/password-input/QasPasswordInput'
import QasPasswordStrengthChecker from './components/password-strength-checker/QasPasswordStrengthChecker'
import QasProfile from './components/profile/QasProfile'
import QasResizer from './components/resizer/QasResizer'
import QasSearchBox from './components/search-box/QasSearchBox'
import QasSelect from './components/select/QasSelect'
import QasSelectList from './components/select-list/QasSelectList'
import QasSignaturePad from './components/signature-pad/QasSignaturePad'
import QasSignatureUploader from './components/signature-uploader/QasSignatureUploader'
import QasSingleView from './components/single-view/QasSingleView'
import QasSortable from './components/sortable/QasSortable'
import QasTableGenerator from './components/table-generator/QasTableGenerator'
import QasTabsGenerator from './components/tabs-generator/QasTabsGenerator'
import QasTextTruncate from './components/text-truncate/QasTextTruncate'
import QasTip from './components/tip/QasTip'
import QasTooltip from './components/tooltip/QasTooltip'
import QasTransfer from './components/transfer/QasTransfer'
import QasUploader from './components/uploader/QasUploader'

import Test from './directives/Test'

import Quasar, { Notify } from 'quasar'
import Vue from 'vue'

import {
  NotifyError,
  NotifySuccess
} from './plugins'

Vue.use(Quasar, {
  plugins: {
    Notify
  }
})

// Por que é necessário exportar duas vezes?
export {
  version,

  NotifyError,
  NotifySuccess,

  QasActionsMenu,
  QasAppBar,
  QasAppMenu,
  QasAppsMenu,
  QasAvatar,
  QasBox,
  QasBreakLine,
  QasBtn,
  QasBtnActions,
  QasCard,
  QasCheckboxGroup,
  QasCopy,
  QasDateTimeInput,
  QasDebugger,
  QasDelete,
  QasDialog,
  QasDialogRouter,
  QasField,
  QasFilters,
  QasFormGenerator,
  QasFormView,
  QasGallery,
  QasGridGenerator,
  QasInput,
  QasLabel,
  QasLayout,
  QasListItems,
  QasListView,
  QasMap,
  QasNestedFields,
  QasNumericInput,
  QasPageHeader,
  QasPasswordInput,
  QasPasswordStrengthChecker,
  QasProfile,
  QasResizer,
  QasSearchBox,
  QasSelect,
  QasSelectList,
  QasSignaturePad,
  QasSignatureUploader,
  QasSingleView,
  QasSortable,
  QasTableGenerator,
  QasTabsGenerator,
  QasTextTruncate,
  QasTip,
  QasTooltip,
  QasTransfer,
  QasUploader,

  Test
}

export default {
  version,

  NotifyError,
  NotifySuccess,

  QasActionsMenu,
  QasAppBar,
  QasAppMenu,
  QasAppsMenu,
  QasAvatar,
  QasBox,
  QasBreakLine,
  QasBtn,
  QasBtnActions,
  QasCard,
  QasCheckboxGroup,
  QasCopy,
  QasDateTimeInput,
  QasDebugger,
  QasDelete,
  QasDialog,
  QasDialogRouter,
  QasField,
  QasFilters,
  QasFormGenerator,
  QasFormView,
  QasGallery,
  QasGridGenerator,
  QasInput,
  QasLabel,
  QasLayout,
  QasListItems,
  QasListView,
  QasMap,
  QasNestedFields,
  QasNumericInput,
  QasPageHeader,
  QasPasswordInput,
  QasPasswordStrengthChecker,
  QasProfile,
  QasResizer,
  QasSearchBox,
  QasSelect,
  QasSelectList,
  QasSignaturePad,
  QasSignatureUploader,
  QasSingleView,
  QasSortable,
  QasTableGenerator,
  QasTabsGenerator,
  QasTextTruncate,
  QasTip,
  QasTooltip,
  QasTransfer,
  QasUploader,

  Test,

  install (Vue) {
    Vue.prototype.$qas = {
      error: NotifyError,
      success: NotifySuccess
    }

    Vue.component('QasActionsMenu', QasActionsMenu)
    Vue.component('QasAppBar', QasAppBar)
    Vue.component('QasAppMenu', QasAppMenu)
    Vue.component('QasAppsMenu', QasAppsMenu)
    Vue.component('QasAvatar', QasAvatar)
    Vue.component('QasBox', QasBox)
    Vue.component('QasBreakLine', QasBreakLine)
    Vue.component('QasBtn', QasBtn)
    Vue.component('QasBtnActions', QasBtnActions)
    Vue.component('QasCard', QasCard)
    Vue.component('QasCheckboxGroup', QasCheckboxGroup)
    Vue.component('QasCopy', QasCopy)
    Vue.component('QasDateTimeInput', QasDateTimeInput)
    Vue.component('QasDebugger', QasDebugger)
    Vue.component('QasDelete', QasDelete)
    Vue.component('QasDialog', QasDialog)
    Vue.component('QasDialogRouter', QasDialogRouter)
    Vue.component('QasField', QasField)
    Vue.component('QasFilters', QasFilters)
    Vue.component('QasFormGenerator', QasFormGenerator)
    Vue.component('QasFormView', QasFormView)
    Vue.component('QasGallery', QasGallery)
    Vue.component('QasGridGenerator', QasGridGenerator)
    Vue.component('QasInput', QasInput)
    Vue.component('QasLabel', QasLabel)
    Vue.component('QasLayout', QasLayout)
    Vue.component('QasListItems', QasListItems)
    Vue.component('QasListView', QasListView)
    Vue.component('QasMap', QasMap)
    Vue.component('QasNestedFields', QasNestedFields)
    Vue.component('QasNumericInput', QasNumericInput)
    Vue.component('QasPageHeader', QasPageHeader)
    Vue.component('QasPasswordInput', QasPasswordInput)
    Vue.component('QasPasswordStrengthChecker', QasPasswordStrengthChecker)
    Vue.component('QasProfile', QasProfile)
    Vue.component('QasResizer', QasResizer)
    Vue.component('QasSearchBox', QasSearchBox)
    Vue.component('QasSelect', QasSelect)
    Vue.component('QasSelectList', QasSelectList)
    Vue.component('QasSignaturePad', QasSignaturePad)
    Vue.component('QasSignatureUploader', QasSignatureUploader)
    Vue.component('QasSingleView', QasSingleView)
    Vue.component('QasSortable', QasSortable)
    Vue.component('QasTableGenerator', QasTableGenerator)
    Vue.component('QasTabsGenerator', QasTabsGenerator)
    Vue.component('QasTextTruncate', QasTextTruncate)
    Vue.component('QasTip', QasTip)
    Vue.component('QasTooltip', QasTooltip)
    Vue.component('QasTransfer', QasTransfer)
    Vue.component('QasUploader', QasUploader)

    Vue.directive(Test.name, Test)
  }
}