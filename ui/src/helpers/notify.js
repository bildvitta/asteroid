import { Notify } from 'quasar'

const notifySuccess = (message, caption) => {
  Notify.create({ caption, message, progress: true, icon: 'o_check' })
}

const notifyError = (message, caption) => {
  Notify.create({ caption, message, progress: true, color: 'negative' })
}

export {
  notifySuccess,
  notifyError
}
