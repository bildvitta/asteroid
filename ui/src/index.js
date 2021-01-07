import { version } from '../package.json'

import Avatar from './components/avatar/QasAvatar'
import BreakLine from './components/break-line/QasBreakLine'
import AppMenu from './components/break-line/QasAppMenu'

import Test from './directives/Test'

import NotifyError from './plugins/NotifyError'
import NotifySuccess from './plugins/NotifySuccess'

export {
  version,

  Avatar,
  BreakLine,
  AppMenu,

  Test
}

export default {
  version,

  Avatar,
  BreakLine,
  AppMenu,

  Test,

  install (Vue) {
    Vue.component('qas-avatar', Avatar)
    Vue.component('qas-breakline', BreakLine)
    Vue.component('qas-appMenu', AppMenu)

    Vue.directive(Test.name, Test)

    Vue.prototype.$qas = {}
    Vue.prototype.$qas.notifyError = NotifyError
    Vue.prototype.$qas.notifySuccess = NotifySuccess
  }
}
