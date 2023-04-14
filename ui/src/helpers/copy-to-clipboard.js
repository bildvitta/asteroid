import { copyToClipboard } from 'quasar'
import { NotifySuccess, NotifyError } from '../plugins'

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
