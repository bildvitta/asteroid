import { version } from '../package.json'

import AppMenu from './components/break-line/QasAppMenu'
import Avatar from './components/avatar/QasAvatar'
import BreakLine from './components/break-line/QasBreakLine'
import Btn from './components/btn/QasBtn'
import Copy from './components/btn/QasCopy'

import Test from './directives/Test'

import NotifyError from './plugins/NotifyError'
import NotifySuccess from './plugins/NotifySuccess'

export {
  version,

  AppMenu,
  Avatar,
  BreakLine,
  Btn,
  Copy,

  Test
}

export default {
  version,

  AppMenu,
  Avatar,
  BreakLine,
  Btn,
  Copy,

  Test,

  install (Vue) {
    Vue.prototype.$qas = {}
    Vue.prototype.$qas.error = NotifyError
    Vue.prototype.$qas.success = NotifySuccess

    Vue.component('QasAppMenu', AppMenu)
    Vue.component('QasAvatar', Avatar)
    Vue.component('QasBreakline', BreakLine)
    Vue.component('QasBtn', Btn)
    Vue.component('QasCopy', Copy)

    Vue.directive(Test.name, Test)
  }
}
