import { InitializeGlobalStores } from '@bildvitta/store-adapter'

export default async ({ app }) => {
  app.use(InitializeGlobalStores)
}
