import { version } from '../package.json'

import Component from './components/Component'
import Directive from './directives/Directive'

export {
  version,

  Component,
  Directive
}

export default {
  version,

  Component,
  Directive,

  install (Vue) {
    Vue.component(Component.name, Component)
    Vue.directive(Directive.name, Directive)
  }
}
