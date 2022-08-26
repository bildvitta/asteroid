export default async ({ app }) => {
  const store = app.config.globalProperties.$store
  const piniaStore = app.config.globalProperties.$piniaStore

  if (!store) {
    app.config.globalProperties.$store = undefined
  }

  if (!piniaStore) {
    app.config.globalProperties.$piniaStore = undefined
  }
}
