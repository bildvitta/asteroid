import { Notify } from 'quasar'
import notifyConfig from '../../shared/notify-config.js'

Notify.registerType('error', { icon: 'o_cancel', ...notifyConfig })

export default (message, caption) => {
  Notify.create({
    caption,
    message,
    type: 'error'
  })
}
