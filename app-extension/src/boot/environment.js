import Vue from 'vue'
import environment from 'extensions'

Vue.prototype.$environment = environment['@bildvitta/asteroid'] || {}
