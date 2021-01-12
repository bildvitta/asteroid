import { version } from '../package.json'

import AppMenu from './components/break-line/QasAppMenu'
import Avatar from './components/avatar/QasAvatar'
import BreakLine from './components/break-line/QasBreakLine'
import Btn from './components/btn/QasBtn'
import BtnActions from './components/btn-actions/BtnActions'
import Copy from './components/btn/QasCopy'
import DateTimeInput from './components/date-time-input/DateTimeInput'
import Delete from './components/delete/QasDelete'

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
  Copy,
  DateTimeInput,
  Delete,

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
  Copy,
  DateTimeInput,
  Delete,

  Test,

  install (Vue) {
    Vue.prototype.$qas = {
      error: NotifyError,
      success: NotifySuccess
    }

    Vue.component('QasAppMenu', AppMenu)
    Vue.component('QasAvatar', Avatar)
    Vue.component('QasBreakline', BreakLine)
    Vue.component('QasBtn', Btn)
    Vue.component('QasCopy', Copy)
    Vue.component('QasDateTimeInput', DateTimeInput)
    Vue.component('QasDelete', Delete)

    Vue.directive(Test.name, Test)
  }
}
