import { Notify } from 'quasar'
import Screen from '../screen/Screen.js'

Notify.registerType('error', {
  color: 'grey-9',
  icon: 'o_cancel',
  progress: true
})

export default (message, caption) => {
  const marginValues = `margin-top: ${Screen().untilMedium ? '40px' : '80px'};`

  Notify?.create({
    attrs: {
      style: marginValues
    },
    caption,
    closeBtn: 'x',
    message,
    position: 'top',
    timeout: 4000,
    type: 'error'
  })
}
