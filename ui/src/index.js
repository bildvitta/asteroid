import { version } from '../package.json'

import AppMenu from './components/break-line/QasAppMenu'
import Avatar from './components/avatar/QasAvatar'
import BreakLine from './components/break-line/QasBreakLine'
import Btn from './components/btn/QasBtn'
import Dialog from './components/dialog/QasDialog'

import Test from './directives/Test'

import NotifyError from './plugins/NotifyError'
import NotifySuccess from './plugins/NotifySuccess'

export {
  version,

  AppMenu,
  Avatar,
  BreakLine,
  Btn,
  Dialog,

  Test
}

export default {
  version,

  AppMenu,
  Avatar,
  BreakLine,
  Btn,
  Dialog,

  Test,

  install (Vue) {
    Vue.component('QasAppMenu', AppMenu)
    Vue.component('QasAvatar', Avatar)
    Vue.component('QasBreakline', BreakLine)
    Vue.component('QasBtn', Btn)
    Vue.component('QasDialog', Dialog)

    Vue.directive(Test.name, Test)

    Vue.prototype.$qas = {}
    Vue.prototype.$qas.notifyError = NotifyError
    Vue.prototype.$qas.notifySuccess = NotifySuccess
  }
}
