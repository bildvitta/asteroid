import { version } from '../package.json'

import AppMenu from './components/break-line/QasAppMenu'
import Avatar from './components/avatar/QasAvatar'
import BreakLine from './components/break-line/QasBreakLine'
import Btn from './components/btn/QasBtn'
import BtnActions from './components/btn-actions/BtnActions'
import CheckboxGroup from './components/checkbox-group/QasCheckboxGroup'
import Copy from './components/btn/QasCopy'
import DateTimeInput from './components/date-time-input/DateTimeInput'

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
  Avatar,
  BreakLine,
  Btn,
  BtnActions,
  CheckboxGroup,
  Copy,
  DateTimeInput,

  Test
}

export default {
  version,

  NotifyError,
  NotifySuccess,

  AppMenu,
  Avatar,
  BreakLine,
  Btn,
  BtnActions,
  CheckboxGroup,
  Copy,
  DateTimeInput,

  Test,

  install (Vue) {
    Vue.prototype.$qas = {
      error: NotifyError,
      success: NotifySuccess
    }

    Vue.component('QasAvatar', Avatar)
    Vue.component('QasBreakline', BreakLine)
    Vue.component('QasCheckboxGroup', CheckboxGroup)
    Vue.component('QasAppMenu', AppMenu)
    Vue.component('QasAvatar', Avatar)
    Vue.component('QasBreakline', BreakLine)
    Vue.component('QasBtn', Btn)
    Vue.component('QasCopy', Copy)
    Vue.component('QasDateTimeInput', DateTimeInput)

    Vue.directive(Test.name, Test)
  }
}
