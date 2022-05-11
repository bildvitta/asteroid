import QasActions from './components/actions/QasActions.vue'
import QasActionsMenu from './components/actions-menu/QasActionsMenu.vue'
import QasAlert from './components/alert/QasAlert.vue'
import QasAppBar from './components/app-bar/QasAppBar.vue'
import QasAppMenu from './components/app-menu/QasAppMenu.vue'
import QasAvatar from './components/avatar/QasAvatar.vue'
import QasBox from './components/box/QasBox.vue'
import QasBreakline from './components/breakline/QasBreakline.vue'
import QasBtn from './components/btn/QasBtn.vue'
import QasCard from './components/card/QasCard.vue'
import QasCheckboxGroup from './components/checkbox-group/QasCheckboxGroup.vue'
import QasCopy from './components/copy/QasCopy.vue'
import QasDateTimeInput from './components/date-time-input/QasDateTimeInput.vue'
import QasDebugger from './components/debugger/QasDebugger.vue'
import QasDelete from './components/delete/QasDelete.vue'
import QasDialog from './components/dialog/QasDialog.vue'
import QasDialogRouter from './components/dialog-router/QasDialogRouter.vue'
import QasField from './components/field/QasField.vue'
import QasFilters from './components/filters/QasFilters.vue'
import QasFormGenerator from './components/form-generator/QasFormGenerator.vue'
import QasFormView from './components/form-view/QasFormView.vue'
import QasGallery from './components/gallery/QasGallery.vue'
import QasGridGenerator from './components/grid-generator/QasGridGenerator.vue'
import QasInput from './components/input/QasInput.vue'
import QasLabel from './components/label/QasLabel.vue'
import QasLayout from './components/layout/QasLayout.vue'
import QasListItems from './components/list-items/QasListItems.vue'
import QasListView from './components/list-view/QasListView.vue'
import QasMap from './components/map/QasMap.vue'
import QasNestedFields from './components/nested-fields/QasNestedFields.vue'
import QasNumericInput from './components/numeric-input/QasNumericInput.vue'
import QasPageHeader from './components/page-header/QasPageHeader.vue'
import QasPasswordInput from './components/password-input/QasPasswordInput.vue'
import QasPasswordStrengthChecker from './components/password-strength-checker/QasPasswordStrengthChecker.vue'
import QasProfile from './components/profile/QasProfile.vue'
import QasResizer from './components/resizer/QasResizer.vue'
import QasSearchBox from './components/search-box/QasSearchBox.vue'
import QasSelect from './components/select/QasSelect.vue'
import QasSelectList from './components/select-list/QasSelectList.vue'
import QasSignaturePad from './components/signature-pad/QasSignaturePad.vue'
import QasSignatureUploader from './components/signature-uploader/QasSignatureUploader.vue'
import QasSingleView from './components/single-view/QasSingleView.vue'
import QasSortable from './components/sortable/QasSortable.vue'
import QasTableGenerator from './components/table-generator/QasTableGenerator.vue'
import QasTabsGenerator from './components/tabs-generator/QasTabsGenerator.vue'
import QasTextTruncate from './components/text-truncate/QasTextTruncate.vue'
import QasTransfer from './components/transfer/QasTransfer.vue'
import QasUploader from './components/uploader/QasUploader.vue'

import VueGoogleMaps from '@fawmi/vue-google-maps'
import { Notify, Quasar, Dialog as QuasarDialog } from 'quasar'

// Plugins
import {
  Dialog,
  NotifyError,
  NotifySuccess,
  Screen
} from './plugins'

import packageInfo from '../package.json'

// Directives
import Test from './directives/Test.js'

const version = packageInfo.version

function install (app) {
  app.component('QasActions', QasActions)
  app.component('QasActionsMenu', QasActionsMenu)
  app.component('QasAlert', QasAlert)
  app.component('QasAppBar', QasAppBar)
  app.component('QasAppMenu', QasAppMenu)
  app.component('QasAvatar', QasAvatar)
  app.component('QasBox', QasBox)
  app.component('QasBreakline', QasBreakline)
  app.component('QasBtn', QasBtn)
  app.component('QasCard', QasCard)
  app.component('QasCheckboxGroup', QasCheckboxGroup)
  app.component('QasCopy', QasCopy)
  app.component('QasDateTimeInput', QasDateTimeInput)
  app.component('QasDebugger', QasDebugger)
  app.component('QasDelete', QasDelete)
  app.component('QasDialog', QasDialog)
  app.component('QasDialogRouter', QasDialogRouter)
  app.component('QasField', QasField)
  app.component('QasFilters', QasFilters)
  app.component('QasFormGenerator', QasFormGenerator)
  app.component('QasFormView', QasFormView)
  app.component('QasGallery', QasGallery)
  app.component('QasGridGenerator', QasGridGenerator)
  app.component('QasInput', QasInput)
  app.component('QasLabel', QasLabel)
  app.component('QasLayout', QasLayout)
  app.component('QasListItems', QasListItems)
  app.component('QasListView', QasListView)
  app.component('QasMap', QasMap)
  app.component('QasNestedFields', QasNestedFields)
  app.component('QasNumericInput', QasNumericInput)
  app.component('QasPageHeader', QasPageHeader)
  app.component('QasPasswordInput', QasPasswordInput)
  app.component('QasPasswordStrengthChecker', QasPasswordStrengthChecker)
  app.component('QasProfile', QasProfile)
  app.component('QasResizer', QasResizer)
  app.component('QasSearchBox', QasSearchBox)
  app.component('QasSelect', QasSelect)
  app.component('QasSelectList', QasSelectList)
  app.component('QasSignaturePad', QasSignaturePad)
  app.component('QasSignatureUploader', QasSignatureUploader)
  app.component('QasSingleView', QasSingleView)
  app.component('QasSortable', QasSortable)
  app.component('QasTableGenerator', QasTableGenerator)
  app.component('QasTabsGenerator', QasTabsGenerator)
  app.component('QasTextTruncate', QasTextTruncate)
  app.component('QasTransfer', QasTransfer)
  app.component('QasUploader', QasUploader)

  app.use(Quasar, { plugins: { Notify, QuasarDialog, Dialog } })

  if (process.env.MAPS_API_KEY) {
    app.use(VueGoogleMaps, { load: { key: process.env.MAPS_API_KEY, libraries: 'places' } })
  }

  app.config.globalProperties.$qas = {
    dialog: Dialog,
    error: NotifyError,
    success: NotifySuccess,
    screen: Screen()
  }

  app.directive(Test.name, Test)
}

export {
  version,

  // components
  QasActions,
  QasActionsMenu,
  QasAlert,
  QasAppBar,
  QasAppMenu,
  QasAvatar,
  QasBox,
  QasBreakline,
  QasBtn,
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
  QasTransfer,
  QasUploader,

  // plugins
  Dialog,
  NotifyError,
  NotifySuccess,
  Screen,

  install
}