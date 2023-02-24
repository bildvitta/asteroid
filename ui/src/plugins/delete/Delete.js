import { Dialog, NotifySuccess, NotifyError } from 'asteroid'
import { useHistory } from '../../composables'
import { Loading } from 'quasar'
import { getAction } from '@bildvitta/store-adapter'

export default (config = {}) => {
  const {
    customId,
    dialogProps = {},
    entity,
    url,
    useAutoDeleteRoute,
    onDelete = () => {},
    onDeleteError = () => {},
    onDeleteSuccess = () => {}
  } = config

  const defaultDialogProps = {
    card: {
      description: 'Tem certeza que deseja excluir este item?'
    },

    ok: {
      label: 'Excluir',
      onClick: destroy
    },

    dialogProps
  }

  const defaultNotifyMessages = {
    error: 'Não conseguimos excluir as informações. Por favor, tente novamente em alguns minutos.',
    success: 'Informações excluídas com sucesso.'
  }

  async function destroy () {
    Loading.show()

    try {
      onDelete(true)

      const payload = { id: customId, url: url }

      const response = await getAction.call(this, {
        entity: entity,
        key: 'destroy',
        payload
      })

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
    return routes.filter(({ params }) => params.id === customId)
  }

  function createDeleteSuccessEvent () {
    const event = new CustomEvent('delete-success', {
      bubbles: false,
      cancelable: false,
      detail: {
        entity: entity,
        url: url,
        id: customId
      }
    })

    window.dispatchEvent(event)
  }

  Dialog(defaultDialogProps)
}
