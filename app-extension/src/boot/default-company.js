import { LocalStorage } from 'quasar'
import { boot } from 'quasar/wrappers'

export default boot(() => {
  window.addEventListener('message', ({ data }) => {
    if (data.type !== 'updateUser') return

    const user = data.user

    const defaultCompany = user.companyLinksOptions.at(0)

    if (!defaultCompany) return

    LocalStorage.set('defaultCompany', defaultCompany)
    // const accessToken = LocalStorage.getItem('accessToken')

    // const hasBearerPrefix = accessToken.startsWith('Bearer ')
    // const userToken = hasBearerPrefix ? accessToken : `Bearer ${accessToken}`
  })
})
