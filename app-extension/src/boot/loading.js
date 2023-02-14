import { boot } from 'quasar/wrappers'
import { Loading } from 'quasar'

export default boot(() => {
  Loading.setDefaults({
    spinnerColor: 'primary',
    messageColor: 'primary',
    backgroundColor: 'white',
    message: 'Carregando...',
    boxClass: 'text-body1'
  })
})
