import asteroidConfig from 'asteroid-config'

export default function ({ name, importFn = () => {} }) {
  const hasComponent = asteroidConfig.framework.thirdPartyComponents.includes(name)

  const QasComponent = getComponent()

  function getComponent () {
    return hasComponent ? importFn() : null
  }

  async function initializeComponent ({ app, onBefore = () => {}, onAfter = () => {} }) {
    if (!hasComponent) return

    await onBefore()

    QasComponent.then(({ default: QasComponent }) => {
      onAfter(QasComponent)
    })
  }

  return {
    QasComponent,

    initializeComponent
  }
}
