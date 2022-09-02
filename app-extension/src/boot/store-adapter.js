import { InitializeGlobalStores } from '@bildvitta/store-adapter'

export default ({ app }) => {
  app.use(InitializeGlobalStores)
}
