import { Notify } from 'quasar'
import notifyConfig from '../../shared/notify-config.js'

Notify.registerType('success', notifyConfig)

export default (message, caption) => {
  Notify.create({
    caption,
    classes: 'qas-notification--success',
    message,
    type: 'success'
  })
}
