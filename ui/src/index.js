import { version } from '../package.json'

import Avatar from './components/avatar/QasAvatar'
import BreakLine from './components/break-line/QasBreakLine'
import TabsGenerator from './components/tabs-generator/QasTabsGenerator'

import Test from './directives/Test'

import NotifyError from './plugins/NotifyError'
import NotifySuccess from './plugins/NotifySuccess'

export {
  version,

  Avatar,
  BreakLine,
  TabsGenerator,

  Test
}

export default {
  version,

  Avatar,
  BreakLine,
  TabsGenerator,

  Test,

  install (Vue) {
    Vue.component('qas-avatar', Avatar)
    Vue.component('qas-breakline', BreakLine)
    Vue.component('qas-tabs-generator', TabsGenerator)
    Vue.directive(Test.name, Test)

    Vue.prototype.$qas = {}
    Vue.prototype.$qas.notifyError = NotifyError
    Vue.prototype.$qas.notifySuccess = NotifySuccess
  }
}
