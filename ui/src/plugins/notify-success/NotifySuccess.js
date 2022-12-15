import { Notify } from 'quasar'
import notifyConfig from '../../shared/notify-config.js'

Notify.registerType('success', { icon: 'o_check_circle', ...notifyConfig })

export default (message, caption) => {
  Notify.create({
    caption,
    message,
    type: 'success'
  })
}
