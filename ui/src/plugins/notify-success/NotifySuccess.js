import { Notify } from 'quasar'
import Screen from '../screen/Screen.js'

Notify.registerType('success', {
  icon: 'o_check_circle',
  progress: true
})

export default (message, caption) => {
  const marginValues = `margin-top: ${Screen().untilMedium ? '40px' : '80px'};`
  
  Notify?.create({
    caption,
    message,
    type: 'success',
    position: 'top',
    attrs: {
      style: marginValues
    },
    closeBtn: 'x',
    timeout: 10000000
  })


}
