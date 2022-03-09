import VuePlugin from '../../../ui/dist/asteroid.esm.js'

// TODO: para desenvolvimento, use este import:
// import VuePlugin from '../../../ui/src/index.esm.js'

export default ({ app }) => {
  app.use(VuePlugin)
}
