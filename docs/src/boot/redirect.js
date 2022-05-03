import { boot } from 'quasar/wrappers'

export default boot(({ router }) => {
  const redirect = sessionStorage.redirect
  delete sessionStorage.redirect

  if (redirect && redirect !== location.href) {
    router.replace(redirect)
  }
})
