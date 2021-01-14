import { version } from '../package.json'

import AppMenu from './components/app-menu/QasAppMenu'
import AppsMenu from './components/apps-menu/AppsMenu'
import Avatar from './components/avatar/QasAvatar'
import BreakLine from './components/break-line/QasBreakLine'
import Btn from './components/btn/QasBtn'
import BtnActions from './components/btn-actions/BtnActions'
import Copy from './components/copy/QasCopy'
import DateTimeInput from './components/date-time-input/DateTimeInput'
import Delete from './components/delete/QasDelete'
import Dialog from './components/dialog/QasDialog'
import Input from './components/input/Input'
import Label from './components/label/Label'
import PasswordStrengthChecker from './components/password-strength-checker/PasswordStrengthChecker'
import SearchBox from './components/search-box/QasSearchBox'
import SettingsMenu from './components/settings-menu/SettingsMenu'

import Test from './directives/Test'

import {
  NotifyError,
  NotifySuccess
} from './plugins'

// Por que é necessário exportar duas vezes?
export {
  version,

  NotifyError,
  NotifySuccess,

  AppMenu,
  AppsMenu,
  Avatar,
  BreakLine,
  Btn,
  BtnActions,
  Copy,
  DateTimeInput,
  Delete,
  Dialog,
  Input,
  Label,
  PasswordStrengthChecker,
  SearchBox,
  SettingsMenu,

  Test
}

export default {
  version,

  NotifyError,
  NotifySuccess,

  AppMenu,
  AppsMenu,
  Avatar,
  BreakLine,
  Btn,
  BtnActions,
  Copy,
  DateTimeInput,
  Delete,
  Dialog,
  Input,
  Label,
  PasswordStrengthChecker,
  SearchBox,
  SettingsMenu,

  Test,

  install (Vue) {
    Vue.prototype.$qas = {
      error: NotifyError,
      success: NotifySuccess
    }

    Vue.component('QasAppMenu', AppMenu)
    Vue.component('QasAppsMenu', AppsMenu)
    Vue.component('QasAvatar', Avatar)
    Vue.component('QasBreakline', BreakLine)
    Vue.component('QasBtn', Btn)
    Vue.component('QasBtnActions', BtnActions)
    Vue.component('QasCopy', Copy)
    Vue.component('QasDateTimeInput', DateTimeInput)
    Vue.component('QasDelete', Delete)
    Vue.component('QasDialog', Dialog)
    Vue.component('QasInput', Input)
    Vue.component('QasLabel', Label)
    Vue.component('QasPasswordStrengthChecker', PasswordStrengthChecker)
    Vue.component('QasSearchBox', SearchBox)
    Vue.component('QasSettingsMenu', SettingsMenu)

    Vue.directive(Test.name, Test)
  }
}
