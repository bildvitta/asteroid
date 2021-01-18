import { version } from '../package.json'

import AppMenu from './components/app-menu/QasAppMenu'
import AppsMenu from './components/apps-menu/QasAppsMenu'
import Avatar from './components/avatar/QasAvatar'
import BreakLine from './components/break-line/QasBreakLine'
import Btn from './components/btn/QasBtn'
import BtnActions from './components/btn-actions/QasBtnActions'
import Copy from './components/copy/QasCopy'
import DateTimeInput from './components/date-time-input/QasDateTimeInput'
import DecimalInput from './components/decimal-input/QasDecimalInput'
import Delete from './components/delete/QasDelete'
import Dialog from './components/dialog/QasDialog'
import FormView from './components/form-view/QasFormView'
import GridGenerator from './components/settings-menu/QasGridGenerator'
import Input from './components/input/QasInput'
import Label from './components/label/QasLabel'
import PageHeader from './components/page-header/PageHeader'
import PasswordStrengthChecker from './components/password-strength-checker/QasPasswordStrengthChecker'
import Profile from './components/profile/QasProfile'
import SearchBox from './components/search-box/QasSearchBox'
import SettingsMenu from './components/settings-menu/QasSettingsMenu'
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
  AppsMenu,
  Avatar,
  BreakLine,
  Btn,
  BtnActions,
  Copy,
  DateTimeInput,
  DecimalInput,
  Delete,
  Dialog,
  FormView,
  GridGenerator,
  Input,
  Label,
  PageHeader,
  PasswordStrengthChecker,
  Profile,
  SearchBox,
  SettingsMenu,
  SingleView,

  Test
}

export default {
  version,

  NotifyError,
  NotifySuccess,

  AppMenu,
  AppsMenu,
  Avatar,
  BreakLine,
  Btn,
  BtnActions,
  Copy,
  DateTimeInput,
  DecimalInput,
  Delete,
  Dialog,
  FormView,
  GridGenerator,
  Input,
  Label,
  PageHeader,
  PasswordStrengthChecker,
  Profile,
  SearchBox,
  SettingsMenu,
  SingleView,

  Test,

  install (Vue) {
    Vue.prototype.$qas = {
      error: NotifyError,
      success: NotifySuccess
    }

    Vue.component('QasAppMenu', AppMenu)
    Vue.component('QasAppsMenu', AppsMenu)
    Vue.component('QasAvatar', Avatar)
    Vue.component('QasBreakline', BreakLine)
    Vue.component('QasBtn', Btn)
    Vue.component('QasBtnActions', BtnActions)
    Vue.component('QasCopy', Copy)
    Vue.component('QasDateTimeInput', DateTimeInput)
    Vue.component('QasDecimalInput', DecimalInput)
    Vue.component('QasDelete', Delete)
    Vue.component('QasDialog', Dialog)
    Vue.component('QasFormView', FormView)
    Vue.component('QasGridGenerator', GridGenerator)
    Vue.component('QasInput', Input)
    Vue.component('QasLabel', Label)
    Vue.component('QasPageHeader', PageHeader)
    Vue.component('QasPasswordStrengthChecker', PasswordStrengthChecker)
    Vue.component('QasProfile', Profile)
    Vue.component('QasSearchBox', SearchBox)
    Vue.component('QasSettingsMenu', SettingsMenu)
    Vue.component('QasSingleView', SingleView)

    Vue.directive(Test.name, Test)
  }
}
