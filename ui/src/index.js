import { version } from '../package.json'

import AppMenu from './components/break-line/QasAppMenu'
import Avatar from './components/avatar/QasAvatar'
import BreakLine from './components/break-line/QasBreakLine'
import Btn from './components/btn/QasBtn'
import Dialog from './components/dialog/QasDialog'
import Copy from './components/btn/QasCopy'

import Test from './directives/Test'

import {
  NotifyError,
  NotifySuccess
} from './plugins'

export {
  version,

  AppMenu,
  Avatar,
  BreakLine,
  Btn,
  Dialog,
  Copy,

  Test
}

export default {
  version,

  AppMenu,
  Avatar,
  BreakLine,
  Btn,
  Dialog,
  Copy,

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
    Vue.component('QasDialog', Dialog)
    Vue.component('QasCopy', Copy)

    Vue.directive(Test.name, Test)
  }
}
