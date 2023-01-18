import { Notify } from 'quasar'
import notifyConfig from '../../shared/notify-config.js'

Notify.registerType('success', notifyConfig)

export default (message, caption) => {
  Notify.create({
    caption,
    message,
    type: 'success'
  })
}
