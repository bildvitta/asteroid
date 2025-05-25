import { copyToClipboard } from 'quasar'
import NotifySuccess from '../plugins/notify-success/NotifySuccess'
import NotifyError from '../plugins/notify-error/NotifyError'

export default async (text, onLoading = () => {}) => {
  onLoading(true)

  try {
    await copyToClipboard(text)
    NotifySuccess('Item copiado com sucesso.')
  } catch {
    NotifyError('Não foi possível copiar o item.')
  } finally {
    setTimeout(() => { onLoading(false) }, 500)
  }
}
