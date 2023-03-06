import { Dialog, NotifySuccess, NotifyError } from 'asteroid'
import { Loading } from 'quasar'
import { getAction } from '@bildvitta/store-adapter'
import { useHistory } from '../../composables'

export default function (config = {}) {
  const {
    dialogProps = {},
    deleteActionParams = {},
    useAutoDeleteRoute,

    // callbacks
    onDelete = () => {},
    onDeleteError = () => {},
    onDeleteSuccess = () => {},
    deleteAction
  } = config

  const { entity, id, url } = deleteActionParams

  const defaultDialogProps = {
    card: { description: 'Tem certeza que deseja excluir este item?' },

    ok: { label: 'Excluir', onClick: () => destroy.call(this) },

    ...dialogProps
  }

  const defaultNotifyMessages = {
    error: 'Não conseguimos excluir as informações. Por favor, tente novamente em alguns minutos.',
    success: 'Informações excluídas com sucesso.'
  }

  async function destroy () {
    Loading.show()

    try {
      onDelete(true)

      const hasDeleteAction = typeof deleteAction === 'function'

      const payload = { id, url }
      const destroyActionParams = { entity, key: 'destroy', payload }

      const response = hasDeleteAction
        ? await deleteAction(payload)
        : await getAction.call(this, destroyActionParams)

      NotifySuccess(defaultNotifyMessages.success)

      if (useAutoDeleteRoute) {
        const { destroyRoutes, history } = useHistory()

        // remove todas rotas que possuem o id do item excluído.
        const routesToBeDeleted = getRoutesToBeDeletedById(history.list)
        destroyRoutes(routesToBeDeleted)
      }

      // cria um evento para notificar que o item foi excluído no "window".
      createDeleteSuccessEvent()

      onDeleteSuccess(response)
    } catch (error) {
      onDeleteError(error)

      NotifyError(defaultNotifyMessages.error)
    } finally {
      onDelete(false)

      Loading.hide()
    }
  }

  function getRoutesToBeDeletedById (routes = []) {
    return routes.filter(({ params }) => params.id === id)
  }

  function createDeleteSuccessEvent () {
    const event = new CustomEvent('delete-success', {
      bubbles: false,
      cancelable: false,
      detail: deleteActionParams
    })

    window.dispatchEvent(event)
  }

  Dialog(defaultDialogProps)
}
