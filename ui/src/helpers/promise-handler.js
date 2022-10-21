import { Loading } from 'quasar'
import { NotifySuccess, NotifyError } from '../plugins'

/** Função para lidar com promises, por exemplo requests.
 *
 * @param {Promise} promise
 * @param {object} config={successMessage, errorMessage, useLoading}
 * @example promiseHandle(new Promise(), { errorMessage: 'Erro', successMessage: 'Sucesso' })
 */
export default async function (promise, config = {}) {
  const {
    successMessage,
    errorMessage,
    useLoading = true,
    onLoading
  } = config

  onLoading && onLoading(true)
  useLoading && Loading.show()

  const promiseToBeExec = typeof promise === 'function' ? promise() : promise

  try {
    const data = await (Array.isArray(promise) ? Promise.all(promise) : promiseToBeExec)

    if (successMessage) NotifySuccess(successMessage)

    return { data, error: null }
  } catch (error) {
    if (errorMessage) NotifyError(errorMessage)

    return { data: null, error }
  } finally {
    onLoading && onLoading(false)
    Loading.hide()
  }
}
