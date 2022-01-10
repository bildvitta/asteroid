import QasAlert from './components/alert/QasAlert.vue'
import QasAppBar from './components/app-bar/QasAppBar.vue'
import QasAppMenu from './components/app-menu/QasAppMenu.vue'
import QasAppsMenu from './components/apps-menu/QasAppsMenu.vue'
import QasAvatar from './components/avatar/QasAvatar.vue'
import QasBox from './components/box/QasBox.vue'
import QasBreakline from './components/breakline/QasBreakline.vue'
import QasBtn from './components/btn/QasBtn.vue'
import QasCopy from './components/copy/QasCopy.vue'
import QasDebugger from './components/debugger/QasDebugger.vue'
import QasLabel from './components/label/QasLabel.vue'
import QasNumericInput from './components/numeric-input/QasNumericInput.vue'
import QasPasswordInput from './components/password-input/QasPasswordInput.vue'
import QasPasswordStrengthChecker from './components/password-strength-checker/QasPasswordStrengthChecker.vue'
import QasSelect from './components/select/QasSelect.vue'

import {
  NotifyError,
  NotifySuccess
} from './plugins'

const version = __UI_VERSION__

function install (app) {
  app.component('QasAlert', QasAlert)
  app.component('QasAppBar', QasAppBar)
  app.component('QasAppMenu', QasAppMenu)
  app.component('QasAppsMenu', QasAppsMenu)
  app.component('QasAvatar', QasAvatar)
  app.component('QasBox', QasBox)
  app.component('QasBreakline', QasBreakline)
  app.component('QasBtn', QasBtn)
  app.component('QasCopy', QasCopy)
  app.component('QasDebugger', QasDebugger)
  app.component('QasLabel', QasLabel)
  app.component('QasNumericInput', QasNumericInput)
  app.component('QasPasswordInput', QasPasswordInput)
  app.component('QasPasswordStrengthChecker', QasPasswordStrengthChecker)
  app.component('QasSelect', QasSelect)

  app.config.globalProperties.$qas = {
    error: NotifyError,
    success: NotifySuccess
  }
}

export {
  version,

  QasAlert,
  QasAppBar,
  QasAppMenu,
  QasAppsMenu,
  QasAvatar,
  QasBox,
  QasBreakline,
  QasBtn,
  QasCopy,
  QasDebugger,
  QasLabel,
  QasNumericInput,
  QasPasswordInput,
  QasPasswordStrengthChecker,
  QasSelect,

  NotifyError,
  NotifySuccess,

  install
}
