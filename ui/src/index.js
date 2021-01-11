import { version } from '../package.json'

import AppMenu from './components/break-line/QasAppMenu'
import Avatar from './components/avatar/QasAvatar'
import BreakLine from './components/break-line/QasBreakLine'
import TabsGenerator from './components/tabs-generator/QasTabsGenerator'
import Btn from './components/btn/QasBtn'

import Test from './directives/Test'

import NotifyError from './plugins/NotifyError'
import NotifySuccess from './plugins/NotifySuccess'

export {
  version,

  AppMenu,
  Avatar,
  BreakLine,
  TabsGenerator,
  Btn,

  Test
}

export default {
  version,

  AppMenu,
  Avatar,
  BreakLine,
  TabsGenerator,
  Btn,

  Test,

  install (Vue) {
    Vue.component('QasTabsGenerator', TabsGenerator)
    Vue.component('QasAppMenu', AppMenu)
    Vue.component('QasAvatar', Avatar)
    Vue.component('QasBreakline', BreakLine)
    Vue.component('QasBtn', Btn)

    Vue.directive(Test.name, Test)

    Vue.prototype.$qas = {}
    Vue.prototype.$qas.notifyError = NotifyError
    Vue.prototype.$qas.notifySuccess = NotifySuccess
  }
}
