import { boot } from 'quasar/wrappers'

import { Notify } from 'quasar'

export default boot(() => {
  const html = ({ message, title }) => {
    return (`
      <div>
        <header class="row items-center">
          <i class="q-icon text-primary material-symbols-rounded boot-notification__icon">
            info
          </i>

          <h5 class="text-grey-10 text-h5">
            ${title}
          </h5>
        </header>

        <div class="q-mt-xs text-grey-8 text-body1">
          ${message}
        </div>
      </div>
   `)
  }

  Notify.create({
    caption: false,
    message: html({ message: 'A venda com ID #56902 foi aprovada por Rachel Melo Muniz.', title: 'Venda aprovada' }),
    html: true,
    timeout: 1212121212,
    closeBtn: 'x',
    iconColor: 'primary',
    classes: 'qas-notification q-py-sm boot-notification bg-white text-grey-8'
  })
})
