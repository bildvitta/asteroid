import { Notify } from 'quasar'
import notifyConfig from '../../shared/notify-config.js'

Notify.registerType('error', notifyConfig)

export default (message, caption) => {
  Notify.create({
    caption,
    classes: 'qas-notification--error',
    message,
    type: 'error'
  })
}
