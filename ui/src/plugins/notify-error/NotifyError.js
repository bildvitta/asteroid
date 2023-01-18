import { Notify } from 'quasar'
import notifyConfig from '../../shared/notify-config.js'

Notify.registerType('error', { icon: 'sym_r_cancel', ...notifyConfig })

export default (message, caption) => {
  Notify.create({
    caption,
    message,
    type: 'error'
  })
}
