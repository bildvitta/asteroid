import { Notify } from 'quasar'

Notify.registerType('success', {
  progress: true,
  icon: 'o_check'
})

export default (message, caption) => {
  Notify.create({ caption, message, type: 'success' })
}
