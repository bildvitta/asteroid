import { version } from '../package.json'

import Avatar from './components/avatar/QasAvatar'
import Breakline from './components/avatar/QasBreakline'

import Test from './directives/Test'

export {
  version,

  Avatar,
  Breakline,

  Test
}

export default {
  version,

  Avatar,
  Breakline,

  Test,

  install (Vue) {
    Vue.component('qas-avatar', Avatar)
    Vue.component('qas-breakline', Breakline)

    Vue.directive(Test.name, Test)
  }
}
