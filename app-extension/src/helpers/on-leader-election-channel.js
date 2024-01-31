/**
 * Esta função é utilizada para estabelecer um padrão de 'leader election'
 * em um contexto de múltiplas abas ou workers.
 * Ela utiliza a API 'navigator.locks.request' para garantir que apenas uma instância
 * (aba/worker) atue como líder.
 * A função recebe um callback que é executado apenas pela instância líder.
 *
 * @param {function(BroadcastChannel): void} callbackFn
 */
export default function onLeaderElection (callbackFn) {
  const notificationsChannel = new BroadcastChannel('notifications')

  navigator.locks.request('leader-election', () => {
    callbackFn(notificationsChannel)

    /**
     * Para que o leader election funcione, é necessário retornar uma Promise
     * que nunca será resolvida, é necessário também declarar o callback "resolve",
     * por mais que ele não seja utilizado.
     */
    return new Promise(_resolve => {})
  })
}
