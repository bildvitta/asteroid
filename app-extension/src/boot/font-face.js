import FontFaceObserver from 'fontfaceobserver'
import asteroidConfig from 'asteroid-config'
import { boot } from 'quasar/wrappers'

export default boot(async () => {
  function setFontFaceObserver () {
    const font = new FontFaceObserver('Material Symbols Rounded')

    const bodyClass = 'icons-is-loading'

    const removeClass = () => document.body.classList.remove(bodyClass)

    document.body.classList.add(bodyClass)

    font.load(null, 60000).then(removeClass, removeClass)
  }

  function fontFaceEventHandler (event) {
    if (event.data.type === 'updateUser') {
      setFontFaceObserver()

      /**
       * após escutar a primeira vez, já remove o listener para não executar novamente
       * caso o evento "updateUser" seja executado novamente.
      */
      window.removeEventListener('message', fontFaceEventHandler)
    }
  }

  console.log('TCL: asteroidConfig.framework?.fonts?.observer?.waitForUserAuthenticate', asteroidConfig.framework?.fonts?.observer?.waitForUserAuthenticate)
  if (asteroidConfig.framework?.fonts?.observer?.waitForUserAuthenticate) {
    window.addEventListener('message', fontFaceEventHandler)

    return
  }

  setFontFaceObserver()
})
