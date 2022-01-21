import QasActions from './components/actions/QasActions.vue'
import QasActionsMenu from './components/actions-menu/QasActionsMenu.vue'
import QasAlert from './components/alert/QasAlert.vue'
import QasAppBar from './components/app-bar/QasAppBar.vue'
import QasAppMenu from './components/app-menu/QasAppMenu.vue'
import QasAppsMenu from './components/apps-menu/QasAppsMenu.vue'
import QasAvatar from './components/avatar/QasAvatar.vue'
import QasBox from './components/box/QasBox.vue'
import QasBreakline from './components/breakline/QasBreakline.vue'
import QasBtn from './components/btn/QasBtn.vue'
import QasCard from './components/card/QasCard.vue'
import QasCopy from './components/copy/QasCopy.vue'
import QasDebugger from './components/debugger/QasDebugger.vue'
import QasDialog from './components/dialog/QasDialog.vue'
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
import QasTabsGenerator from './components/tabs-generator/QasTabsGenerator.vue'
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
  app.component('QasAppsMenu', QasAppsMenu)
  app.component('QasAvatar', QasAvatar)
  app.component('QasBox', QasBox)
  app.component('QasBreakline', QasBreakline)
  app.component('QasBtn', QasBtn)
  app.component('QasCard', QasCard)
  app.component('QasCopy', QasCopy)
  app.component('QasDebugger', QasDebugger)
  app.component('QasDialog', QasDialog)
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
  app.component('QasTabsGenerator', QasTabsGenerator)
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
  QasAppsMenu,
  QasAvatar,
  QasBox,
  QasBreakline,
  QasBtn,
  QasCard,
  QasCopy,
  QasDebugger,
  QasDialog,
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
  QasTabsGenerator,
  QasTransfer,

  // plugin
  Dialog,
  NotifyError,
  NotifySuccess,

  install
}
