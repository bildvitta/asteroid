import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

export default boot(() => {
  /**
   * @param {{
   *  message: string
   *  title: string
   *  link?: string
   * }} config
   */
  function notify (config = {}) {
    const {
      link
    } = config

    const classes = [
      'bg-white',
      'boot-notification',
      'q-py-sm',
      'text-grey-8'
    ]

    if (link) classes.push(...['boot-notification--has-link', 'cursor-pointer'])

    const closeNotify = Notify.create({
      actions: [
        {
          icon: 'sym_r_close',
          class: 'boot-notification__close-button qas-btn qas-btn--tertiary qas-btn--tertiary-grey-10'
        }
      ],

      message: getHTMLMessage(config),

      classes: classes.join(' '),
      multiLine: true,
      icon: 'sym_r_info',
      html: true,
      iconColor: 'primary',
      position: 'bottom-right',
      timeout: 30000 + 100000,
      attrs: {
        onClick: event => onNotifyClick({ event, link, closeNotify })
      }
    })

    function onNotifyClick ({ event, link, closeNotify }) {
      if (!link) return

      if (hasParentByClassName('boot-notification__close-button', event.srcElement)) return

      window.open(link)

      closeNotify()
    }

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

  function hasParentByClassName (className, element) {
    while (element.parentElement) {
      const hasParentElement = element.parentElement.classList.contains(className)

      if (hasParentElement) return true

      element = element.parentElement
    }

    return false
  }

  window.notify = ({ link }) => notify({
    message: 'A venda com ID #56902 foi aprovada por Rachel Melo Muniz.',
    title: 'Venda aprovada' + Math.random(),
    link
  })

  window.notify({ link: 'https://youtube.com' })
})
