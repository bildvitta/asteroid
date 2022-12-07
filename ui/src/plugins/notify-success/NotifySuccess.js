import { Notify } from 'quasar'
import Screen from '../screen/Screen.js'

Notify.registerType('success', {
  color: 'grey-9',
  icon: 'o_check_circle',
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
    type: 'success'
  })
}
