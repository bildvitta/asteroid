import { copyToClipboard } from 'quasar'
import { NotifySuccess, NotifyError } from '../plugins'

export default async (text, onLoading = () => {}) => {
  onLoading(true)

  try {
    await copyToClipboard(text)
    NotifySuccess('Copiado!', text)
  } catch {
    NotifyError('Não foi possível copiar.', text)
  } finally {
    setTimeout(() => { onLoading(false) }, 500)
  }
}
