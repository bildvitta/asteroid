import hasParentByClassName from '../helpers/private/has-parent-by-class-name'

import { ref } from 'vue'
import { Notify } from 'quasar'

const callbackFunctions = {
  onNotifyReceived: []
}

export function onNotifyReceived (callbackFn) {
  callbackFunctions.onNotifyReceived.push(callbackFn)
}

const unreadNotificationsCount = ref(0)

export default function () {
  function triggerNotify (notification) {
    callbackFunctions.onNotifyReceived.forEach(fn => fn((notification)))
  }

  function setUnreadNotificationsCount (value) {
    unreadNotificationsCount.value = value
  }

  function incrementUnreadNotificationsCount () {
    unreadNotificationsCount.value++
  }

  /**
   * @param {{
   *  message: string
   *  title: string
   *  link?: string
   * }} config
   */
  function sendNotify (config = {}) {
    const { link } = config

    const classes = ['bg-white', 'boot-notification', 'q-py-sm', 'text-grey-8']

    if (link) classes.push(...['boot-notification--has-link', 'cursor-pointer'])

    const closeNotify = Notify.create({
      actions: [{
        icon: 'sym_r_close',
        class: 'boot-notification__close-button qas-btn qas-btn--tertiary qas-btn--tertiary-grey-10'
      }],

      attrs: {
        onClick: event => onNotifyClick({ event, link, closeNotify })
      },

      classes: classes.join(' '),
      html: true,
      icon: 'sym_r_info',
      iconColor: 'primary',
      message: getHTMLMessage(config),
      multiLine: true,
      position: 'bottom-right',
      timeout: 30000
    })

    // TODO: descomentar
    // triggerNotify(config)

    /**
     * Função que é chamada quando o usuário clica na notificação, se a notificação
     * tem link, então ele vai ser redirecionado para o link em uma nova aba, caso
     * não tenha link, nada acontece.
     */
    function onNotifyClick ({ event, link, closeNotify }) {
      if (!link) return

      if (hasParentByClassName('boot-notification__close-button', event.srcElement)) return

      window.open(link)

      closeNotify()
    }

    /**
     * Função que retorna um HTML para seguir estilos propostos pelo design.
     */
    function getHTMLMessage ({ message, title, icon = 'info' } = {}) {
      return (`
         <div>
           <header class="row items-center">
             <h5 class="text-grey-10 text-h5 boot-notification__title">
               ${title}
             </h5>
           </header>

           <div class="q-mt-sm text-grey-8 text-body1">
             ${message}
           </div>
         </div>
      `)
    }
  }

  return {
    unreadNotificationsCount,

    setUnreadNotificationsCount,
    incrementUnreadNotificationsCount,
    sendNotify,
    triggerNotify
  }
}
