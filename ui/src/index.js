import { version } from '../package.json'

import AppMenu from './components/break-line/QasAppMenu'
import Avatar from './components/avatar/QasAvatar'
import BreakLine from './components/break-line/QasBreakLine'
import Btn from './components/btn/QasBtn'
import Copy from './components/copy/QasCopy'
import SingleView from './components/single-view/QasSingleView'

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
  Copy,
  SingleView,

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
  Copy,
  SingleView,

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
    Vue.component('QasSingleView', SingleView)

    Vue.directive(Test.name, Test)
  }
}
