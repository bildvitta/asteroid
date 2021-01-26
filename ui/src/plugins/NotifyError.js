import { Notify } from 'quasar'

Notify.registerType('error', {
  color: 'negative',
  progress: true
})

export default (message, caption) => {
  Notify.create({ caption, message, type: 'error' })
}
