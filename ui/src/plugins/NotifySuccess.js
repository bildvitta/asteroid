import { Notify } from 'quasar'

Notify.registerType('success', {
  icon: 'o_check',
  progress: true
})

export default (message, caption) => {
  Notify.create({ caption, message, type: 'success' })
}
