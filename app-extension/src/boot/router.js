export default function ({ router }) {
  const push = router.push.bind(router)
  const replace = router.replace.bind(router)
  const resolve = router.resolve.bind(router)

  router.push = function (options) {
    const { route } = resolve(options)

    if (router.history.current.fullPath !== route.fullPath) {
      return push(options)
    }
  }

  router.replace = function (options) {
    const { route } = resolve(options)

    if (router.history.current.fullPath !== route.fullPath) {
      return replace(options)
    }
  }
}
