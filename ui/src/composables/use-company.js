import { SessionStorage } from 'quasar'
import { ref } from 'vue'

export function getCompanyFromStorage () {
  return SessionStorage.getItem('company') || ''
}

const company = ref(getCompanyFromStorage())

const companyHooks = {
  onCompanyChange: []
}

export function onCompanyChange (callback) {
  companyHooks.onCompanyChange.push(callback)
}

export default function useCompany () {
  function setCompany (company) {
    console.log('TCL: setCompany -> company useCompany', company)
    const oldCompany = company.value

    setCompanyInStorage(company)

    // company.value = company

    triggerCompanyChange(company, oldCompany)
  }

  function setCompanyInStorage (company) {
    SessionStorage.setItem('company', company)
  }

  function triggerCompanyChange (newCompany, oldCompany) {
    companyHooks.onCompanyChange.forEach(fn => fn(newCompany, oldCompany))
  }

  function onCompanyChange (callback) {
    companyHooks.onCompanyChange.push(callback)
  }

  function removeCompanyChangeHook (callback) {
    const index = companyHooks.onCompanyChange.indexOf(callback)

    if (index !== -1) {
      companyHooks.onCompanyChange.splice(index, 1)
    }
  }

  return {
    company,
    setCompany,
    setCompanyInStorage,
    onCompanyChange,
    getCompanyFromStorage,
    removeCompanyChangeHook
  }
}
