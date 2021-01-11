import { version } from '../package.json'

import AppMenu from './components/break-line/QasAppMenu'
import Avatar from './components/avatar/QasAvatar'
import BreakLine from './components/break-line/QasBreakLine'
import Btn from './components/btn/QasBtn'
import Copy from './components/btn/QasCopy'
import Uploader from './components/uploader/QasUploader'

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
  Copy,
  Uploader,

  Test
}

export default {
  version,

  AppMenu,
  Avatar,
  BreakLine,
  Btn,
  Copy,
  Uploader,

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
    Vue.component('QasUploader', Uploader)

    Vue.directive(Test.name, Test)
  }
}
