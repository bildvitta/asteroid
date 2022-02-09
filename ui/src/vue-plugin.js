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
import QasDialog from './components/dialog/QasDialog.vue'
import QasGallery from './components/gallery/QasGallery.vue'
import QasGridGenerator from './components/grid-generator/QasGridGenerator.vue'
import QasInput from './components/input/QasInput.vue'
import QasLabel from './components/label/QasLabel.vue'
import QasListItems from './components/list-items/QasListItems.vue'
import QasNumericInput from './components/numeric-input/QasNumericInput.vue'
import QasPasswordInput from './components/password-input/QasPasswordInput.vue'
import QasPasswordStrengthChecker from './components/password-strength-checker/QasPasswordStrengthChecker.vue'
import QasSearchBox from './components/search-box/QasSearchBox.vue'
import QasSelect from './components/select/QasSelect.vue'
import QasSelectList from './components/select-list/QasSelectList.vue'
import QasSignaturePad from './components/signature-pad/QasSignaturePad.vue'
import QasSortable from './components/sortable/QasSortable.vue'
import QasTableGenerator from './components/table-generator/QasTableGenerator.vue'
import QasTabsGenerator from './components/tabs-generator/QasTabsGenerator.vue'
import QasTextTruncate from './components/text-truncate/QasTextTruncate.vue'
import QasTransfer from './components/transfer/QasTransfer.vue'

import {
  Dialog,
  NotifyError,
  NotifySuccess
} from './plugins'

const version = __UI_VERSION__

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
  app.component('QasDialog', QasDialog)
  app.component('QasGallery', QasGallery)
  app.component('QasGridGenerator', QasGridGenerator)
  app.component('QasInput', QasInput)
  app.component('QasLabel', QasLabel)
  app.component('QasListItems', QasListItems)
  app.component('QasNumericInput', QasNumericInput)
  app.component('QasPasswordInput', QasPasswordInput)
  app.component('QasPasswordStrengthChecker', QasPasswordStrengthChecker)
  app.component('QasSearchBox', QasSearchBox)
  app.component('QasSelect', QasSelect)
  app.component('QasSelectList', QasSelectList)
  app.component('QasSignaturePad', QasSignaturePad)
  app.component('QasSortable', QasSortable)
  app.component('QasTableGenerator', QasTableGenerator)
  app.component('QasTabsGenerator', QasTabsGenerator)
  app.component('QasTextTruncate', QasTextTruncate)
  app.component('QasTransfer', QasTransfer)

  app.config.globalProperties.$qas = {
    error: NotifyError,
    success: NotifySuccess,
    dialog: Dialog
  }
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
  QasDialog,
  QasGallery,
  QasGridGenerator,
  QasInput,
  QasLabel,
  QasListItems,
  QasNumericInput,
  QasPasswordInput,
  QasPasswordStrengthChecker,
  QasSearchBox,
  QasSelect,
  QasSelectList,
  QasSignaturePad,
  QasSortable,
  QasTableGenerator,
  QasTabsGenerator,
  QasTextTruncate,
  QasTransfer,

  // plugin
  Dialog,
  NotifyError,
  NotifySuccess,

  install
}
